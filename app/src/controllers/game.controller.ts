import {Request, Response} from 'express';
import {BadRequest} from 'http-errors';
import GameService from '../services/game.service';
import gameValidator from '../validators/game.validator';

export default class GameController {
  /**
   * Get Game Status
   *
   * - 200: {GameStatusDTO}
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   *
   * @param {Request} req http request
   * @param {Response} res http response
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
    if (gameValidator(req.body)) {
      const gameDto = await GameService.newGame(req.body);
      res.send(gameDto);
    } else {
      res.send(gameValidator.errors).sendStatus(400);
    }
  }

  /**
   * Place token for a game.
   *
   * - 200: Id succesful.
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   *
   * @param {Request} req http request
   * @param {Response} res http response
   */
  static async placeToken(req: Request, res: Response) {
    // TODO
  }

  /**
   * Handle errors thrown from the service.
   *
   * @param {unknown} e error.
   * @param {Response} res http response
   */
  static handleError(e: unknown, res: Response) {
    console.log('Error Occured', e);
    if (e instanceof BadRequest) {
      // If bad request, we will let the user know what they did wrong.
      res.status(400);
      res.send(e.message);
    } else {
      // All internal errors will give a generic message.
      // This way we do no give away impementation details or
      // allow the user to know what went wrong.
      res.status(500);
      res.send('Internal Error Occured.');
    }
  }
}
