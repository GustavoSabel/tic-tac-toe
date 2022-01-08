import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import 'reflect-metadata';
import Player from './player.entity';

@Entity({name: 'games'})
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'start_time'})
  startTime: Date;

  @Column({name: 'end_time', nullable: true})
  endTime?: Date;

  @Column()
  rows: number;

  @Column()
  cols: number;

  @Column()
  neededToWin: number;

  @Column()
  numberOfMoves: number;

  @Column('simple-array')
  board: number[][];

  @ManyToOne(() => Player)
  @JoinColumn({name: 'player_one_id'})
  playerOne: Player;

  @ManyToOne(() => Player)
  @JoinColumn({name: 'player_two_id'})
  playerTwo: Player;

  @Column({name: 'last_played', nullable: true})
  lastPlayed?: number;

  @Column('simple-array', {nullable: true})
  winners?: number[];
}
