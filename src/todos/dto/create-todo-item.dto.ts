import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;
}
