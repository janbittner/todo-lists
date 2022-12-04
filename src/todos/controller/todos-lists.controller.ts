import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { TodosListsService } from '../service/todos-lists.service';

@Controller('todos/lists')
export class TodosListsController {
  constructor(private service: TodosListsService) {}

  @Post()
  createList(@Body() body: CreateTodoListDto) {
    return this.service.create(body);
  }

  @Get()
  getAllLists() {
    return this.service.findAll();
  }

  @Get('/:id')
  findListId(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }
}
