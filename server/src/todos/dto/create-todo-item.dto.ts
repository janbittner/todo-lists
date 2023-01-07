import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deadline?: Date;
}
