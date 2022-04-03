import Player from '@src/domain/entities/player.entity';

export default class PlayerRepository {
  async findAll() {
    return Player.find();
  }
  async find(id: number) {
    return Player.findOneOrFail(id);
  }
  async save(player: Player) {
    return await player.save();
  }
}