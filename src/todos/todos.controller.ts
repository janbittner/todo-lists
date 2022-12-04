import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  createTodo(@Body() body: CreateTodoListDto) {
    return this.todoService.createList(body);
  }

  @Get()
  getAllTodos() {
    return this.todoService.findAllLists();
  }

  @Get('/:id')
  findTodoById(@Param('id') id: string) {
    return this.todoService.findOneList(parseInt(id));
  }

  // @Patch('/:id')
  // updateTodoStatus(@Param('id') id: string) {
  //   return this.todoService.updateStatus(parseInt(id));
  // }
}
