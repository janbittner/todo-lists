import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userServerice: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.userServerice.signUp(user);
  }

  @Post('/login')
  logIn(@Body() user: LoginUserDto) {
    return this.userServerice.logIn(user, this.jwtService);
  }
}
