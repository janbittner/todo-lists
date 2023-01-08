import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
import { TodosListsService } from '../service/todos-lists.service';

@Controller('todos/lists')
export class TodosListsController {
  constructor(private service: TodosListsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createList(@Request() req, @Body() body: CreateTodoListDto) {
    return this.service.create(req.user.id, body);
  }

  @Get()
  getAllLists() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  updateList(
    @Request() req,
    @Param('id') listId: number,
    @Body() body: UpdateTodoListDto,
  ) {
    return this.service.updateList(req.user, listId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('add/user/')
  addUser(
    @Request() req,
    @Query('username') username: string,
    @Query('list_id') listId: number,
  ) {
    return this.service.addUser(req.user, username, listId);
  }
}
