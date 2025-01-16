import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const salt = await bcrypt.genSalt(10);

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);
    await this.usersRepository.save({
      username: registerUserDto.username,
      password: registerUserDto.password,
    });

    const user = await this.usersRepository.findOne({
      where: { username: registerUserDto.username },
    });
    user.generateToken();

    const userWithToken = await this.usersRepository.save(user);
    return _.omit(userWithToken, 'password');
  }
}
