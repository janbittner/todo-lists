import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  deadline?: Date;
}
