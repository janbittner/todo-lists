import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemtDto } from '../dto/update-todo-item.dto';
import { TodoItem } from '../entity/todos-item.entity';
import { TodoList } from '../entity/todos-list.entity';

@Injectable()
export class TodosItemsService {
  constructor(
    @InjectRepository(TodoItem) private itemsRepo: Repository<TodoItem>,
    @InjectRepository(TodoList) private listsRepo: Repository<TodoList>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async create(user: User, listId: number, itemDto: CreateTodoItemDto) {
    const foundUser: User = await this.usersRepo.findOne({
      where: { id: user.id },
    });

    const list: TodoList = await this.listsRepo.findOne({
      where: { id: listId },
      relations: {
        users: true,
        items: true,
      },
    });

    if (!list) throw new NotFoundException(`List with id ${listId} not found`);

    if (!list.users.find((user) => user.username === foundUser.username))
      throw new UnauthorizedException(
        `User ${user.username} is not permitted to add items to this list. Add the user to the list first.`,
      );

    const item: TodoItem = this.itemsRepo.create({
      ...itemDto,
      createdBy: foundUser.username,
      list,
    });

    return this.itemsRepo.save(item);
  }

  async updateStatus(user: User, itemId: number, body: UpdateTodoItemtDto) {
    const item: TodoItem = await this.itemsRepo.findOne({
      where: { id: itemId },
      relations: { list: true },
    });

    if (!item) throw new NotFoundException(`Item with id ${itemId} not found`);

    const foundUser: User = await this.usersRepo.findOne({
      where: { id: user.id },
    });

    const list: TodoList = await this.listsRepo.findOne({
      where: { id: item.list.id },
      relations: { users: true },
    });

    if (!list.users.find((user) => user.username === foundUser.username))
      throw new UnauthorizedException(
        `User ${user.username} is not permitted to edit items in this list. Add the user to the list first.`,
      );

    return this.itemsRepo.save({ ...item, status: body.status });
  }
}
