import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get()
  findTodos() {
    return this.todoService.find();
  }

  @Get('/:id')
  findTodoById(@Param('id') id: string) {
    return this.todoService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateTodoStatus(@Param('id') id: string) {
    return this.todoService.update(parseInt(id));
  }
}
