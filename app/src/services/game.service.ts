import {GameStatusDTO} from '../dtos/gamestatus.dto';
import {GameIdDTO} from '../dtos/gameid.dto';
import Game from '../entities/game.entity';
import Player from '../entities/player.entity';

type NewGameArgs = {
  player1Id: number;
  player2Id: number;
};

type PlaceTokenArgs = {
  gameId: number;
  playerId: number;
  row: number;
  col: number;
};

export default class GameService {
  static async gameStatus(gameId: number): Promise<GameStatusDTO> {
    throw new Error('Not Implemented');
  }

  static async newGame(args: NewGameArgs): Promise<GameIdDTO> {
    const player1 = await Player.findOneOrFail(args.player1Id);
    const player2 = await Player.findOneOrFail(args.player2Id);

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
      gameId: newGame.id,
    };
  }

  static async placeToken(args: PlaceTokenArgs) {
    throw new Error('Not Implemented');
  }
}
