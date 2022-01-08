import {GameStatusDTO} from '../dtos/gamestatus.dto';
import {GameIdDTO} from '../dtos/gameid.dto';
import Game from '../entities/game.entity';
import PlayerService from './player.service';

type NewGameArgs = {
  player1: string;
  player2: string;
};
export default class GameService {
  static async gameStatus(gameId: number): Promise<GameStatusDTO> {
    throw new Error('Not Implemented');
  }

  static async newGame(args: NewGameArgs): Promise<GameIdDTO> {
    const player1 = await PlayerService.getOrCreate(args.player1);
    const player2 = await PlayerService.getOrCreate(args.player2);

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.rows = 3;
    newGame.cols = 3;
    newGame.neededToWin = 3;
    newGame.numberOfMoves = 0;
    newGame.board = [[3], [3], [3]];
    newGame.playerOne = player1;
    newGame.playerTwo = player2;
    newGame.winners = [];
    await newGame.save();
    return {
      game_id: newGame.id,
    };
  }

  static async placeToken(
    gameId: number,
    playerId: number,
    row: number,
    col: number
  ) {
    throw new Error('Not Implemented');
  }
}
