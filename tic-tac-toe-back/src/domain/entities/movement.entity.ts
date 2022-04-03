import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import 'reflect-metadata';
import { PlayerType } from '@src/types/PlayerType';
import Game from './game.entity';

@Entity({ name: 'movements' })
export default class Movement extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    player: PlayerType;

  @Column()
    match: number;

  @ManyToOne(() => Game, (game) => game.movements)
    game: Game;
}
