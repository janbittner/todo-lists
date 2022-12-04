import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { TodosItemsService } from '../service/todos-items.service';

@Controller('todos/items')
export class TodosItemsController {
  constructor(private service: TodosItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/list/:id')
  createItem(
    @Param('id') listId: number,
    @Body() createTodoItemDto: CreateTodoItemDto,
  ) {
    return this.service.create(listId, createTodoItemDto);
  }

  @Get()
  getAllItems() {
    return this.service.findAll();
  }

  @Get('/:id')
  findItemById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }
}
