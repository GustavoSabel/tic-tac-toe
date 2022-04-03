import Game from '@src/domain/entities/game.entity';
import GameRepository from '../../repositories/GameRepository';
import PlayerRepository from '../../repositories/PlayerRepository';

type CreateNewGameRequest = {
  player1Id: number;
  player2Id: number;
}

export class CreateNewGame {
  constructor(
    private gameRepository: GameRepository,
    private playerRepository: PlayerRepository) { }

  async execute(args: CreateNewGameRequest): Promise<Game> {
    const player1 = await this.playerRepository.find(args.player1Id);
    const player2 = await this.playerRepository.find(args.player2Id);

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.neededToWin = 3;
    newGame.numberOfMoves = 0;
    newGame.playerO = player1;
    newGame.playerX = player2;
    newGame.winners = [];
    newGame.cleanBoard();
    return await this.gameRepository.save(newGame)
  }
}