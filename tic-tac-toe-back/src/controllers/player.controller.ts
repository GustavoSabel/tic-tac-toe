import { Request, Response } from 'express';
import { PlayerDTO } from '@src/dtos/player.dto';
import { newPlayerValidator } from '@src/validators/player.validator';
import { CreateNewPlayer } from '@src/application/usecases/player/create-new-player';
import PlayerRepository from '@src/application/repositories/PlayerRepository';

export default class PlayerController {
  static async newPlayer(req: Request, res: Response) {
    if (newPlayerValidator(req.body)) {
      const player = await new CreateNewPlayer(new PlayerRepository()).execute({ name: req.body.name });
      const dto: PlayerDTO = {
        id: player.id,
        name: player.name,
      };
      res.send(dto);
    } else {
      res.status(400).send(newPlayerValidator.errors);
    }
  }

  static async getPlayers(_req: Request, res: Response) {
    const players: PlayerDTO[] = (await new PlayerRepository().findAll()).map((x) => ({
      id: x.id,
      name: x.name,
    }));
    res.send(players);
  }
}
