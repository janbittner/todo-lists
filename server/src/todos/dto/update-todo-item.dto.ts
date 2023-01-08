import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

import { TodoStatus } from '../types';

export class UpdateTodoItemtDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: TodoStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deadline?: Date;
}
