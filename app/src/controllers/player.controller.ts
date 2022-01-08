import {Request, Response} from 'express';
import {PlayerDTO} from '../dtos/player.dto';
import PlayerService from '../services/player.service';
import {newPlayerValidator} from '../validators/player.validator';

export default class PlayerController {
  /**
   * Get Game Status
   *
   * - 200: {PlayerDTO}
   * - 400: If consumer passed a bad request.
   * - 500: Internal error occured.
   */
  static async newPlayer(req: Request, res: Response) {
    if (newPlayerValidator(req.body)) {
      const player = await PlayerService.newPlayer(req.body.name);
      const dto: PlayerDTO = {
        playerId: player.id,
        name: player.name,
      };
      res.send(dto);
    } else {
      res.status(400).send(newPlayerValidator.errors);
    }
  }
}
