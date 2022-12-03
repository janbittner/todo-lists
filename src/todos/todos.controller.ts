import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  @Get('/:id')
  findTodoById(@Param('id') id: string) {
    return this.todoService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateTodoStatus(@Param('id') id: string) {
    return this.todoService.updateStatus(parseInt(id));
  }
}
