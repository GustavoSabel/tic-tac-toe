import {PlayerDTO} from './player.dto';

export enum Outcome {
  ACTIVE,
  GAME_OVER,
}

export interface GameStatusDTO {
  gameId: number;
  players: PlayerDTO[];
  outcome: Outcome;
  winner?: number[];
}
