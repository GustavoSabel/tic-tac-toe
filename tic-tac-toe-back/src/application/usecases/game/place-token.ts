import { BadRequest } from 'http-errors';
import Game from '@src/entities/game.entity';
import { PlayerType } from '@src/types/PlayerType';
import Movement from '@src/entities/movement.entity';
import Board from '@src/valueObjects/Board';
import GameRepository from '../../repositories/GameRepository';

type placeTokenRequest = {
  gameId: number;
  player: PlayerType;
  row: number;
  col: number;
};

export default class PlaceToken {
  constructor(private gameRepository: GameRepository) { }
    
  async execute(args: placeTokenRequest) {
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

    const currentPlayer = args.player === 'O' ? game.playerO : game.playerX;

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

    let message = '';
    const victory = board.checkIfPlayerHasAVictory(args.player);
    if (victory) {
      game.newGame();
      game.winners.push(args.player);
      message = `Player ${currentPlayer.name} wins`;
    } else if (this.allBoardIsFilled(game)) {
      game.newGame();
      message = 'The game tied';
    } else {
      message = `Player ${currentPlayer.name} placed the token in row ${
        args.row + 1
      } and col ${args.col + 1}`;
    }

    const numberOfVictoriesOfCurrentPlayer = this.calcNumberOfVictotiesOfPlayer(
      game,
      args.player,
    );
    if (numberOfVictoriesOfCurrentPlayer >= game.neededToWin) {
      game.endTime = new Date();
      game.finalWinner = args.player;
      message = `PLAYER ${currentPlayer.name.toUpperCase()}`;
    }

    this.gameRepository.save(game)

    return {
      message,
      playerO: game.playerO.name,
      playerX: game.playerX.name,
      victory,
      match: game.currentMatch,
      board: newBoard.BoardArray,
      boardBeauty: newBoard.beautifyBoard(),
      winners: game.winners,
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
