import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoList } from './entity/todos-list.entity';
import { TodosListsController } from './controller/todos-lists.controller';
import { TodosListsService } from './service/todos-lists.service';

import { TodoItem } from './entity/todos-item.entity';
import { TodosItemsController } from './controller/todos-items.controller';
import { TodosItemsService } from './service/todos-items.service';
import { User } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoItem, User])],
  controllers: [TodosListsController, TodosItemsController],
  providers: [TodosListsService, TodosItemsService],
})
export class TodosModule {}
