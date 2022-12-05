import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { TodoList } from '../entity/todos-list.entity';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class TodosListsService {
  constructor(
    @InjectRepository(TodoList) private listsRepo: Repository<TodoList>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async create(userId: string, body: CreateTodoListDto) {
    const user: User = await this.usersRepo.findOne({
      where: { id: userId },
    });

    const list = this.listsRepo.create({ ...body, users: [user] });

    return this.listsRepo.save(list);
  }

  async addUser(username: string, listId: number) {
    const user: User = await this.usersRepo.findOne({
      where: { username: username },
    });

    const list: TodoList = await this.findOne(listId);
    const updatedList: TodoList = { ...list, users: [...list.users, user] };

    return this.listsRepo.save(updatedList);
  }

  findAll() {
    return this.listsRepo.find({ relations: { items: true, users: true } });
  }

  findOne(id: number) {
    if (!id) return null;

    return this.listsRepo.findOne({
      where: { id },
      relations: { items: true, users: true },
    });
  }
}
