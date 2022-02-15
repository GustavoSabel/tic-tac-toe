import { PlayerDTO } from './player.dto';

export interface GameStatusDTO {
  gameId: number;
  players: PlayerDTO[];
  winner?: number[];
}
