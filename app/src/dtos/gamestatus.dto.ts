import {PlayerDTO} from './player.dto';

export enum Outcome {
  ACTIVE,
  GAME_OVER,
}

export interface GameStatusDTO {
  game_id: number;
  players: PlayerDTO[];
  outcome: Outcome;
  winner?: number[];
}
