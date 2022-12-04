import { User } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../types';
import { TodoList } from './todos-list.entity';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ type: 'date', nullable: true })
  deadline?: Date;

  @Column({ default: Status.Active })
  status: Status;

  @ManyToOne(() => TodoList, (list) => list.items)
  list: TodoList;
}
