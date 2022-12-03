import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  create(body: CreateTodoDto) {
    const todo = this.repo.create(body);

    return this.repo.save(todo);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) return null;

    return this.repo.findOne({ where: { id } });
  }

  async updateStatus(id: number) {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');

    return this.repo.save({ ...todo, isCompleted: true });
  }
}
