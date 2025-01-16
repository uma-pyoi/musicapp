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
    console.log('registerUserDto = ', registerUserDto);
    const salt = await bcrypt.genSalt(10);
    console.log('salt = ', salt);

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);
    console.log('password = ', registerUserDto.password);
    const firstSaveRes = await this.usersRepository.save({
      username: registerUserDto.username,
      password: registerUserDto.password,
    });
    console.log('firstSaveRes = ', firstSaveRes);

    const user = await this.usersRepository.findOne({
      where: { username: registerUserDto.username },
    });

    console.log('user = ', user);

    user.generateToken();

    const userWithToken = await this.usersRepository.save(user);

    console.log('userWithToken = ', userWithToken);

    return _.omit(userWithToken, 'password');
  }
}
