import Game from '@src/domain/entities/game.entity';

export default class GameRepository {
  async find(id: number) {
    return Game.findOneOrFail(id);
  }
  async save(game: Game) {
    return await game.save();
  }
}