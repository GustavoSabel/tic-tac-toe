import { BadRequest } from 'http-errors';
import { GameIdDTO } from '../dtos/gameid.dto';
import Game from '../entities/game.entity';
import Player from '../entities/player.entity';
import { PlayerType } from '../types/PlayerType';
import VictoryService from './victory.service';
import Movement from '../entities/movement.entity';
import Board from '@valueObjects/Board';

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
    const victory = VictoryService.getVictory(args.player, board);
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

    await game.save();

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

  private static calcNumberOfVictotiesOfPlayer(game: Game, player: PlayerType) {
    return game.winners.reduce(
      (p, winner) => (winner === player.toString() ? p + 1 : p),
      0,
    );
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
