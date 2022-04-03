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
import { NonePlayerType, PlayerType } from '../../types/PlayerType';
import Movement from './movement.entity';
import { BoardType } from '../../types/BoardType';
import Board from '@src/domain/valueObjects/Board';

@Entity({ name: 'games' })
export default class Game extends BaseEntity {
  constructor() {
    super();
    this.currentMatch = 1;
    this.playerStartedCurrentMatch = 'O';
    this.numberOfMoves = 0;
    this.winners = [];
    this.finalWinner = '';
  }
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'start_time' })
    startTime: Date;

  @Column({ name: 'end_time', nullable: true })
    endTime?: Date;

  @Column()
    neededToWin: number;

  @Column()
    numberOfMoves: number;

  @Column('simple-array')
    board: BoardType;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_o_id' })
    playerO: Player;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_x_id' })
    playerX: Player;

  @Column({ name: 'player_started_current_match', nullable: true })
    playerStartedCurrentMatch: PlayerType;

  @Column({ name: 'last_played', nullable: true })
    lastPlayed: PlayerType | NonePlayerType;

  @Column('simple-array')
    winners: PlayerType[];

  @Column({ name: 'final_winner', nullable: true })
    finalWinner: PlayerType | NonePlayerType;

  @OneToMany(() => Movement, (movement) => movement.game, { eager: true })
    movements: Movement[];

  @Column()
    currentMatch: number;

  public cleanBoard() {
    this.board = Board.CreateEmptyBoard().BoardArray;
  }

  public newGame() {
    this.cleanBoard();
    this.numberOfMoves = 0;
    this.lastPlayed = '';
    this.currentMatch += 1;
    this.playerStartedCurrentMatch = this.playerStartedCurrentMatch === 'O' ? 'X' : 'O';
  }
}
