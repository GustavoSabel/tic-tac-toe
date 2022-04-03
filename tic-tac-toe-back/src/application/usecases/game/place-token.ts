import { BadRequest } from 'http-errors';
import Game from '@src/domain/entities/game.entity';
import { NonePlayerType, PlayerType } from '@src/types/PlayerType';
import Movement from '@src/domain/entities/movement.entity';
import Board from '@src/domain/valueObjects/Board';
import GameRepository from '../../repositories/GameRepository';
import { BoardType } from '@src/types/BoardType';

type placeTokenRequest = {
  gameId: number;
  player: PlayerType;
  row: number;
  col: number;
};

type Response = {
  namePayerO: string
  namePlayerX: string
  nextPlayer: PlayerType
  victory: BoardType | null
  match: number
  board: BoardType
  boardBeauty: string[]
  winners: PlayerType[]
  matchWinner: PlayerType | null
  finalWinner: PlayerType | NonePlayerType
  status: 'playing' | 'winMatch' | 'drawMatch' | 'finished'
}

export default class PlaceToken {
  constructor(private gameRepository: GameRepository) { }
    
  async execute(args: placeTokenRequest) : Promise<Response> {
    const game = await this.gameRepository.find(args.gameId);
    if (game.endTime) {
      throw new BadRequest('This game is finished. Please create a new game');
    }

    if (args.player !== 'X' && args.player !== 'O') {
      throw new BadRequest('User should be "X" or "O"');
    }

    if (args.col < 0 || args.col > 2) {
      throw new BadRequest('Invalid column position');
    }
    if (args.row < 0 || args.row > 2) {
      throw new BadRequest('Invalid row position');
    }

    if (game.lastPlayed === args.player) {
      throw new BadRequest(`Player ${args.player} already made a move`);
    }
    const board = new Board(game.board);
    if (board.getValue(args.row, args.col)) {
      throw new BadRequest('This position already has been used');
    }

    board.setValue(args.row, args.col, args.player);
    const newBoard = new Board(board.BoardArray);
    game.lastPlayed = args.player;
    game.numberOfMoves += 1;
    game.board = board.BoardArray;

    const movement = new Movement();
    movement.match = game.currentMatch;
    movement.player = args.player;
    game.movements.push(movement);

    let matchWinner: PlayerType | null = null
    let nextPlayer: PlayerType
    let status: 'playing' | 'winMatch' | 'drawMatch' | 'finished'
    const victory = board.checkIfPlayerHasAVictory(args.player);
    if (victory) {
      game.newGame();
      game.winners.push(args.player);
      matchWinner = args.player
      nextPlayer = game.playerStartedCurrentMatch
      status = 'winMatch';
    } else if (this.allBoardIsFilled(game)) {
      game.newGame();
      nextPlayer = game.playerStartedCurrentMatch
      status = 'drawMatch';
    } else {
      nextPlayer = args.player === 'O' ? 'X' : 'O'
      status = 'playing';
    }

    const numberOfVictoriesOfCurrentPlayer = this.calcNumberOfVictotiesOfPlayer(
      game,
      args.player,
    );
    if (numberOfVictoriesOfCurrentPlayer >= game.neededToWin) {
      game.endTime = new Date();
      game.finalWinner = args.player;
      status = 'finished';
    }

    await this.gameRepository.save(game)    

    return {
      namePayerO: game.playerO.name,
      namePlayerX: game.playerX.name,
      nextPlayer,
      victory: victory?.toBoard(args.player).BoardArray ?? null,
      match: game.currentMatch,
      board: newBoard.BoardArray,
      boardBeauty: newBoard.beautifyBoard(),
      winners: game.winners,
      status,
      finalWinner: game.finalWinner,
      matchWinner: matchWinner,
    };
  }

  calcNumberOfVictotiesOfPlayer(game: Game, player: PlayerType) {
    return game.winners.reduce(
      (p, winner) => (winner === player.toString() ? p + 1 : p),
      0,
    );
  }

  allBoardIsFilled(game: Game) {
    for (let i = 0; i < game.board.length; i++) {
      if (!game.board[i]) {
        return false;
      }
    }
    return true;
  }
}
