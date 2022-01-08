import {Request, Response} from 'express';
import {BadRequest} from 'http-errors';
import GameService from '../services/game.service';
import {
  newGameValidator,
  placeTokenValidator,
} from '../validators/game.validator';

export default class GameController {
  /**
   * Get Game Status
   *
   * - 200: {GameStatusDTO}
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   */
  static async gameStatus(req: Request, res: Response) {
    // TODO
  }

  /**
   * Create a new game.
   *
   * - 200: {GameIdDTO}
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   */
  static async newGame(req: Request, res: Response) {
    try {
      if (newGameValidator(req.body)) {
        const gameDto = await GameService.newGame(req.body);
        res.send(gameDto);
      } else {
        res.status(400).send(newGameValidator.errors);
      }
    } catch (e) {
      GameController.handleError(e, res);
    }
  }

  /**
   * Place token for a game.
   *
   * - 200: If succesful.
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   */
  static async placeToken(req: Request, res: Response) {
    try {
      if (placeTokenValidator(req.body)) {
        const game = await GameService.placeToken({
          ...req.body,
          gameId: Number.parseInt(req.params.gameId),
        });
        res.send(game);
      } else {
        res.status(400).send(placeTokenValidator.errors);
      }
    } catch (e) {
      GameController.handleError(e, res);
    }
  }

  static handleError(e: unknown, res: Response) {
    console.log('Error Occured', e);
    if (e instanceof BadRequest) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Internal Error Occured.');
    }
  }
}
