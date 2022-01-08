import Player from '../entities/player.entity';

export default class PlayerService {
  static async getOrCreate(playerName: string): Promise<Player> {
    const player = await Player.findOne({name: playerName});
    if (player) {
      return player;
    }
    const newPlayer = new Player();
    newPlayer.name = playerName;
    await newPlayer.save();
    return newPlayer;
  }
}
