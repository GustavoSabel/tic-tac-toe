import Game from '@src/domain/entities/game.entity';
import { BoardType } from '@src/types/BoardType';
import { PlayerType } from '@src/types/PlayerType';
import GameRepository from '../../repositories/GameRepository';
import PlayerRepository from '../../repositories/PlayerRepository';

type CreateNewGameRequest = {
  playerOId: number;
  playerXId: number;
}

type NewGameResponseDTO = { 
  gameId: number
  board: BoardType
  match: number
  nextPlayer: PlayerType
}

export class CreateNewGame {
  constructor(
    private gameRepository: GameRepository,
    private playerRepository: PlayerRepository) { }

  async execute(args: CreateNewGameRequest): Promise<NewGameResponseDTO> {
    const playerO = await this.playerRepository.find(args.playerOId);
    const playerX = await this.playerRepository.find(args.playerXId);

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.neededToWin = 3;
    newGame.playerO = playerO;
    newGame.playerX = playerX;
    newGame.cleanBoard();
    const game = await this.gameRepository.save(newGame)

    return {
      gameId: game.id,
      board: game.board,
      match: game.currentMatch,
      nextPlayer: newGame.playerStartedCurrentMatch,
    }
  }
}