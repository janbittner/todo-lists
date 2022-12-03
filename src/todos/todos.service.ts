import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todos) private repo: Repository<Todos>) {}

  create(body: CreateTodoDto) {
    const todo = this.repo.create(body);

    return this.repo.save(todo);
  }

  find() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) return null;

    return this.repo.findOne({ where: { id } });
  }

  async update(id: number) {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');

    return this.repo.save({ ...todo, isCompleted: true });
  }
}
