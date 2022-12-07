import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async addUser(reqUser: User, username: string, listId: number) {
    const foundUser: User = await this.usersRepo.findOne({
      where: { id: reqUser.id },
    });

    const list: TodoList = await this.listsRepo.findOne({
      where: { id: listId },
      relations: { users: true },
    });

    if (!list.users.find((user) => user.username === foundUser.username))
      throw new UnauthorizedException(
        `User ${reqUser.username} is not permitted to add users to this list, only users already linked to the lists are.`,
      );

    const userToBeAdded: User = await this.usersRepo.findOne({
      where: { username: username },
    });

    const updatedList: TodoList = {
      ...list,
      users: [...list.users, userToBeAdded],
    };

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
