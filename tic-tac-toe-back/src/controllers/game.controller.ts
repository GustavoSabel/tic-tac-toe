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
import validate from '@src/core/validator/validate';

export default class GameController {
  static async newGame(req: Request, res: Response) {
    const data = validate(newGameValidator, req.body)
    const gameDto = await new CreateNewGame(new GameRepository(), new PlayerRepository())
      .execute(data);
    res.send(gameDto);
  }

  static async placeToken(req: Request, res: Response) {
    const data = validate(placeTokenValidator, req.body)
    const game = await new PlaceToken(new GameRepository()).execute({
      col: data.col,
      row: data.row,
      player: data.player as PlayerType,
      gameId: Number.parseInt(req.params.gameId),
    });
    res.send(game);
  }
}
