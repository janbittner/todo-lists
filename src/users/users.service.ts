import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async signUp(body: CreateUserDto) {
    if (!body.password) throw new Error(`no password ${JSON.stringify(body)}`);

    const hashedPassword = await bcrypt.hash(
      body.password,
      await bcrypt.genSalt(),
    );

    const hashed = {
      ...body,
      password: hashedPassword,
    };
    const user = this.repo.create(hashed);

    return this.repo.save(user);
  }

  async logIn(user: LoginUserDto, jwt: JwtService) {
    const httpException = new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
    const foundUser = await this.repo.findOne({ where: { email: user.email } });

    if (foundUser) {
      const { password } = foundUser;

      if (bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };

        return {
          token: jwt.sign(payload),
        };
      }

      return httpException;
    }

    return httpException;
  }
}
