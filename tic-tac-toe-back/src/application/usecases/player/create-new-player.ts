import Player from '@src/domain/entities/player.entity';
import PlayerRepository from '../../repositories/PlayerRepository';

type CreateNewPlayerRequest = {
  name: string
}

export class CreateNewPlayer {
  constructor(private playerRepository: PlayerRepository) { }

  async execute(args: CreateNewPlayerRequest): Promise<Player> {
    const newPlayer = new Player();
    newPlayer.name = args.name;
    return await this.playerRepository.save(newPlayer)
  }
}