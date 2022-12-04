import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { TodoItem } from '../entity/todos-item.entity';

@Injectable()
export class TodosItemsService {
  constructor(
    @InjectRepository(TodoItem) private itemsRepo: Repository<TodoItem>,
  ) {}

  create(body: CreateTodoItemDto) {
    const item = this.itemsRepo.create(body);

    return this.itemsRepo.save(item);
  }

  findAll() {
    return this.itemsRepo.find();
  }

  findOne(id: number) {
    if (!id) return null;

    return this.itemsRepo.findOne({ where: { id } });
  }

  // async updateStatus(id: number) {
  //   const todo = await this.listRepo.findOne({ where: { id } });
  //   if (!todo) throw new NotFoundException('Todo not found');

  //   return this.listRepo.save({ ...todo, isCompleted: true });
  // }
}
