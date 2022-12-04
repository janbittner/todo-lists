import { User } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItem } from './todos-item.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => TodoItem)
  items: TodoItem[];
}
