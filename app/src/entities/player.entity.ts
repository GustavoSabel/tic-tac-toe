import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import 'reflect-metadata';

@Entity({name: 'players'})
export default class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
