import { ConflictException, Injectable } from '@nestjs/common';
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
    const foundUser = await this.usersRepo.findOne({
      where: { username: body.username },
    });

    if (foundUser)
      throw new ConflictException(`User ${body.username} already exists`);

    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }
}
