import Player from '../entities/player.entity';

export default class PlayerService {
  static async newPlayer(playerName: string): Promise<Player> {
    const newPlayer = new Player();
    newPlayer.name = playerName;
    await newPlayer.save();
    return newPlayer;
  }
  static async get(id: number): Promise<Player> {
    return await Player.findOneOrFail(id);
  }
}
