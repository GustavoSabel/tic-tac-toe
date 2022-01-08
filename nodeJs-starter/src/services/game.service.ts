import {GameStatusDTO} from '../dtos/gamestatus.dto';
import {GameIdDTO} from '../dtos/gameid.dto';

/**
 * Game Service
 * Business Logic for handling games.
 *
 * @author TopherThomas
 */
export default class GameService {
  static async gameStatus(gameId: number): Promise<GameStatusDTO> {
    throw new Error('Not Implemented');
  }

  static async newGame(
    playerOneId: number,
    playerTwoId: number
  ): Promise<GameIdDTO> {
    throw new Error('Not Implemented');
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
