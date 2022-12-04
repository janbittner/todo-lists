import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './todos.controller';
import { TodoList } from './entity/todos-list.entity';
import { TodosService } from './todos.service';
import { TodoItem } from './entity/todos-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoItem])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
