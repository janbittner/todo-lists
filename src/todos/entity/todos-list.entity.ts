import { User } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoItem } from './todos-item.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => TodoItem, (item) => item.list)
  items: TodoItem[];
}
