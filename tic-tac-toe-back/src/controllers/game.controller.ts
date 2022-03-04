import { Request, Response } from 'express';
import { BadRequest } from 'http-errors';
import GameService from '@src/services/game.service';
import { PlayerType } from '@src/types/PlayerType';
import {
  newGameValidator,
  placeTokenValidator,
} from '@src/validators/game.validator';

export default class GameController {
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

  static async placeToken(req: Request, res: Response) {
    try {
      if (placeTokenValidator(req.body)) {
        const game = await GameService.placeToken({
          col: req.body.col,
          row: req.body.row,
          player: req.body.player as PlayerType,
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
    if (e instanceof BadRequest) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Internal Error Occured.');
    }
  }
}
