import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { TodoList } from '../entity/todos-list.entity';

@Injectable()
export class TodosListsService {
  constructor(
    @InjectRepository(TodoList) private listsRepo: Repository<TodoList>,
  ) {}

  create(body: CreateTodoListDto) {
    const list = this.listsRepo.create(body);

    return this.listsRepo.save(list);
  }

  findAll() {
    return this.listsRepo.find();
  }

  findOne(id: number) {
    if (!id) return null;

    return this.listsRepo.findOne({ where: { id } });
  }
}
