import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { TodoItem } from '../entity/todos-item.entity';
import { TodoList } from '../entity/todos-list.entity';

@Injectable()
export class TodosItemsService {
  constructor(
    @InjectRepository(TodoItem) private itemsRepo: Repository<TodoItem>,
    @InjectRepository(TodoList) private listsRepo: Repository<TodoList>,
  ) {}

  async create(listId: number, itemDto: CreateTodoItemDto) {
    const list: TodoList = await this.listsRepo.findOne({
      where: { id: listId },
      relations: {
        users: true,
        items: true,
      },
    });

    const item: TodoItem = this.itemsRepo.create({
      ...itemDto,
      list,
    });

    return this.itemsRepo.save(item);
  }

  findAll() {
    return this.itemsRepo.find();
  }

  findOne(id: number) {
    if (!id) return null;

    return this.itemsRepo.findOne({ where: { id } });
  }
}
