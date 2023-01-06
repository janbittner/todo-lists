import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemtDto } from '../dto/update-todo-item.dto';
import { TodosItemsService } from '../service/todos-items.service';

@Controller('todos/items')
export class TodosItemsController {
  constructor(private service: TodosItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addItem(
    @Request() req,
    @Query('list_id') listId: number,
    @Body() createTodoItemDto: CreateTodoItemDto,
  ) {
    return this.service.create(req.user, listId, createTodoItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-status/:id')
  createItem(
    @Request() req,
    @Param('id') itemId: number,
    @Body() body: UpdateTodoItemtDto,
  ) {
    return this.service.updateStatus(req.user, itemId, body);
  }
}
