import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import 'reflect-metadata';
import Player from './player.entity';
import {PlayerType} from '../types/PlayerType';
import Movement from './movement.entity';
import {BoardType} from '../types/BoardType';
import Board from '../objects/board';

@Entity({name: 'games'})
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'start_time'})
  startTime: Date;

  @Column({name: 'end_time', nullable: true})
  endTime?: Date;

  @Column()
  neededToWin: number;

  @Column()
  numberOfMoves: number;

  @Column('simple-array')
  board: BoardType;

  @ManyToOne(() => Player, {eager: true})
  @JoinColumn({name: 'player_o_id'})
  playerO: Player;

  @ManyToOne(() => Player, {eager: true})
  @JoinColumn({name: 'player_x_id'})
  playerX: Player;

  @Column({name: 'last_played', nullable: true})
  lastPlayed?: PlayerType;

  @Column('simple-array')
  winners: PlayerType[];

  @Column({name: 'final_winner', nullable: true})
  finalWinner?: PlayerType;

  @OneToMany(() => Movement, movement => movement.game)
  movements: Movement[];

  @Column()
  currentMatch: number;

  public cleanBoard() {
    this.board = Board.CreateEmptyBoard().BoardArray;
  }

  public newGame() {
    this.cleanBoard();
    this.numberOfMoves = 0;
    this.lastPlayed = undefined;
    this.currentMatch += 1;
  }
}
