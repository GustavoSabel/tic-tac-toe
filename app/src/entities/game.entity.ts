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
  neededToWin: number;

  @Column()
  numberOfMoves: number;

  @Column('simple-array')
  board: string[];

  @ManyToOne(() => Player, {eager: true})
  @JoinColumn({name: 'player_one_id'})
  playerOne: Player;

  @ManyToOne(() => Player, {eager: true})
  @JoinColumn({name: 'player_two_id'})
  playerTwo: Player;

  @Column({name: 'last_played', nullable: true})
  lastPlayed?: 1 | 2;

  @Column('simple-array')
  winners: string[];

  @Column({name: 'final_winner', nullable: true})
  finalWinner?: 1 | 2;

  public cleanBoard() {
    this.board = ['', '', '', '', '', '', '', '', ''];
  }

  private calcBoardPosition(row: number, col: number) {
    return row * 3 + col;
  }

  public getBoardValue(row: number, col: number) {
    return this.board[this.calcBoardPosition(row, col)];
  }

  public setBoardValue(row: number, col: number, value: string) {
    this.board[this.calcBoardPosition(row, col)] = value;
  }
}
