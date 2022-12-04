import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findOne(username: string) {
    return this.usersRepo.findOne({ where: { username: username } });
  }

  async signUp(body: CreateUserDto) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }
}
