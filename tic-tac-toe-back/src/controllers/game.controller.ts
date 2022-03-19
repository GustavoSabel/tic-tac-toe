import { Request, Response } from 'express';
import { PlayerType } from '@src/types/PlayerType';
import {
  newGameValidator,
  placeTokenValidator,
} from '@src/validators/game.validator';
import { CreateNewGame } from '@src/application/usecases/game/create-new-game';
import GameRepository from '@src/application/repositories/GameRepository';
import PlayerRepository from '@src/application/repositories/PlayerRepository';
import PlaceToken from '@src/application/usecases/game/place-token';

export default class GameController {
  static async newGame(req: Request, res: Response) {
    if (newGameValidator(req.body)) {
      const gameDto = await new CreateNewGame(new GameRepository(), new PlayerRepository()).execute(req.body);
      res.send(gameDto);
    } else {
      res.status(400).send(newGameValidator.errors);
    }
  }

  static async placeToken(req: Request, res: Response) {
    if (placeTokenValidator(req.body)) {
      const game = await new PlaceToken(new GameRepository()).execute({
        col: req.body.col,
        row: req.body.row,
        player: req.body.player as PlayerType,
        gameId: Number.parseInt(req.params.gameId),
      });
      res.send(game);
    } else {
      res.status(400).send(placeTokenValidator.errors);
    }
  }
}
