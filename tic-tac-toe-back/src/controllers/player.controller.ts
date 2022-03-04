import { Request, Response } from 'express';
import { BadRequest } from 'http-errors';
import { PlayerDTO } from '@src/dtos/player.dto';
import Player from '@src/entities/player.entity';
import PlayerService from '@src/services/player.service';
import { newPlayerValidator } from '@src/validators/player.validator';

export default class PlayerController {
  /**
   * Get Game Status
   *
   * - 200: {PlayerDTO}
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   */
  static async newPlayer(req: Request, res: Response) {
    try {
      if (newPlayerValidator(req.body)) {
        const player = await PlayerService.newPlayer(req.body.name);
        const dto: PlayerDTO = {
          id: player.id,
          name: player.name,
        };
        res.send(dto);
      } else {
        res.status(400).send(newPlayerValidator.errors);
      }
    } catch (e) {
      PlayerController.handleError(e, res);
    }
  }

  static async getPlayers(req: Request, res: Response) {
    try {
      const players: PlayerDTO[] = (await Player.find()).map((x) => ({
        id: x.id,
        name: x.name,
      }));
      res.send(players);
    } catch (e) {
      PlayerController.handleError(e, res);
    }
  }

  static handleError(e: unknown, res: Response) {
    if (e instanceof BadRequest) {
      res.status(400).send(e.message);
    } else {
      console.error(e)
      res.status(500).send('Internal Error Occured.');
    }
  }
}