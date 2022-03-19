import Player from '@src/entities/player.entity';

type CreateNewPlayerRequest = {
  name: string
}

export class CreateNewPlayer {
  async execute(args: CreateNewPlayerRequest): Promise<Player> {
    const newPlayer = new Player();
    newPlayer.name = args.name;
    await newPlayer.save();
    return newPlayer;
  }
}