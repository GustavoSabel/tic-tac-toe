import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';
import 'reflect-metadata';

@Entity({ name: 'players' })
export default class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;
}
