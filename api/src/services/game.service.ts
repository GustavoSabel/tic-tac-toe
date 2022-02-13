import {GameIdDTO} from '../dtos/gameid.dto';
import Game from '../entities/game.entity';
import Player from '../entities/player.entity';
import {BadRequest} from 'http-errors';
import {PlayerType} from '../types/PlayerType';
import VictoryService from './victory.service';
import Movement from '../entities/movement.entity';
import {BoardType} from '../types/BoardType';

type NewGameArgs = {
  player1Id: number;
  player2Id: number;
};

type PlaceTokenArgs = {
  gameId: number;
  player: PlayerType;
  row: number;
  col: number;
};

export default class GameService {
  static async newGame(args: NewGameArgs): Promise<GameIdDTO> {
    const player1 = await Player.findOneOrFail(args.player1Id);
    const player2 = await Player.findOneOrFail(args.player2Id);

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.neededToWin = 3;
    newGame.numberOfMoves = 0;
    newGame.playerO = player1;
    newGame.playerX = player2;
    newGame.winners = [];
    newGame.cleanBoard();
    await newGame.save();
    return {
      gameId: newGame.id,
    };
  }

  static async placeToken(args: PlaceTokenArgs) {
    const game = await Game.findOneOrFail(args.gameId);
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
    if (game.getBoardValue(args.row, args.col)) {
      throw new BadRequest('This position already has been used');
    }

    game.setBoardValue(args.row, args.col, args.player);
    const newBoard: BoardType = game.board.map(x => x);
    game.lastPlayed = args.player;
    game.numberOfMoves += 1;

    const movement = new Movement();
    movement.match = game.currentMatch;
    movement.player = args.player;
    game.movements.push(movement);

    let message = '';
    const victory = VictoryService.getVictory(args.player, game);
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
      args.player
    );
    if (numberOfVictoriesOfCurrentPlayer >= game.neededToWin) {
      game.endTime = new Date();
      game.finalWinner = args.player;
      message = `PLAYER ${currentPlayer.name.toUpperCase()}`;
    }

    await game.save();

    return {
      gameId: game.id,
      message,
      playerO: game.playerO.name,
      playerX: game.playerX.name,
      victory: victory,
      match: game.currentMatch,
      board: newBoard,
      boardBeauty: this.beautifyBoard(newBoard),
      winners: game.winners,
    };
  }

  private static calcNumberOfVictotiesOfPlayer(game: Game, player: PlayerType) {
    return game.winners.reduce(
      (p, winner) => (winner === player.toString() ? p + 1 : p),
      0
    );
  }

  private static beautifyBoard(board: BoardType) {
    const beautyBoard = board.map(x => (!x ? '_' : x));
    return [
      beautyBoard.slice(0, 3).join(' '),
      beautyBoard.slice(3, 6).join(' '),
      beautyBoard.slice(6, 9).join(' '),
    ];
  }

  private static allBoardIsFilled(game: Game) {
    for (let i = 0; i < game.board.length; i++) {
      if (!game.board[i]) {
        return false;
      }
    }
    return true;
  }
}
