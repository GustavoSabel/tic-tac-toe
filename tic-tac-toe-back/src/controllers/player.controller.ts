import { Request, Response } from 'express';
import { PlayerDTO } from '@src/dtos/player.dto';
import Player from '@src/entities/player.entity';
import { newPlayerValidator } from '@src/validators/player.validator';
import { CreateNewPlayer } from '@src/application/usecases/player/create-new-player';

export default class PlayerController {
  static async newPlayer(req: Request, res: Response) {
    if (newPlayerValidator(req.body)) {
      const player = await new CreateNewPlayer().execute({ name: req.body.name });
      const dto: PlayerDTO = {
        id: player.id,
        name: player.name,
      };
      res.send(dto);
    } else {
      res.status(400).send(newPlayerValidator.errors);
    }
  }

  static async getPlayers(req: Request, res: Response) {
    const players: PlayerDTO[] = (await Player.find()).map((x) => ({
      id: x.id,
      name: x.name,
    }));
    res.send(players);
  }
}
