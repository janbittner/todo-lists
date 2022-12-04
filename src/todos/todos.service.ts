import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { TodoItem } from './entity/todos-item.entity';
import { TodoList } from './entity/todos-list.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoList) private listRepo: Repository<TodoList>,
    @InjectRepository(TodoItem) private itemRepo: Repository<TodoItem>,
  ) {}

  createList(body: CreateTodoListDto) {
    const todo = this.listRepo.create(body);

    return this.listRepo.save(todo);
  }

  findAllLists() {
    return this.listRepo.find();
  }

  findOneList(id: number) {
    if (!id) return null;

    return this.listRepo.findOne({ where: { id } });
  }

  // async updateStatus(id: number) {
  //   const todo = await this.listRepo.findOne({ where: { id } });
  //   if (!todo) throw new NotFoundException('Todo not found');

  //   return this.listRepo.save({ ...todo, isCompleted: true });
  // }
}
