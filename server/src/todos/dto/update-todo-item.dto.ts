import { IsNotEmpty, IsString } from 'class-validator';

import { TodoStatus } from '../types';

export class UpdateTodoItemtDto {
  @IsNotEmpty()
  @IsString()
  status: TodoStatus;
}
