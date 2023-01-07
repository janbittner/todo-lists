import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { todoItems, todoLists, users } from '../seed/data';
import { TodoItem } from './todos/entity/todos-item.entity';
import { TodoList } from './todos/entity/todos-list.entity';
import { User } from './users/entity/users.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  // export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(TodoList)
    private readonly todoListsRepo: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private readonly todoItemsRepo: Repository<TodoItem>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap(): Promise<any> {
    for (const user of users) {
      const foundUser = await this.usersRepo.findOne({
        where: { username: user.username },
      });

      if (foundUser) return;

      const userToSave = this.usersRepo.create(user);

      await this.usersRepo.save(userToSave);
    }

    for (const list of todoLists) {
      const foundList = await this.todoListsRepo.findOne({
        where: { id: list.id },
      });

      if (foundList) return;

      const listToSave = this.todoListsRepo.create(list);

      await this.todoListsRepo.save(listToSave);
    }

    for (const item of todoItems) {
      const foundItem = await this.todoItemsRepo.findOne({
        where: { id: item.id },
      });

      if (foundItem) return;

      const itemToSave = this.todoItemsRepo.create(item);
      await this.todoItemsRepo.save(itemToSave);
    }

    return Promise.resolve();
  }
}
