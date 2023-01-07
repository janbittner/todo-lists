import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoItem } from './todos/entity/todos-item.entity';
import { TodoList } from './todos/entity/todos-list.entity';
import { TodosModule } from './todos/todos.module';
import { User } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, TodoList, TodoItem]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [TodoList, TodoItem, User],
      synchronize: true,
    }),
    TodosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
