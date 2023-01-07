import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TodoStatus } from '../types';
import { TodoList } from './todos-list.entity';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  createdBy: string;

  @Column({ type: 'date', nullable: true })
  deadline?: Date;

  @Column({ default: TodoStatus.Active })
  status: TodoStatus;

  @ManyToOne(() => TodoList, (list) => list.items)
  list: TodoList;
}
