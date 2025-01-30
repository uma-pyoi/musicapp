import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { SignInUserDto } from '../dto/sign-in-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const salt = await bcrypt.genSalt(10);

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);
    await this.usersRepository.save(registerUserDto);

    const user = await this.usersRepository.findOne({
      where: { username: registerUserDto.username },
    });
    user.generateToken();
    const userWithToken = await this.usersRepository.save(user);
    return _.omit(userWithToken, 'password');
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.usersRepository.findOne({ where: { username: signInUserDto.username } });
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    const isMatchPassword = await bcrypt.compare(signInUserDto.password, user.password);
    if (!isMatchPassword) {
      throw new NotFoundException('Invalid username or password');
    }

    user.generateToken();
    const userWithToken = await this.usersRepository.save(user);

    return _.omit(userWithToken, 'password', 'username');
  }

  async logout(token: string) {
    const user = await this.getUserByToken(token);
    if (!user) {
      throw new ForbiddenException();
    }
    await user.generateToken();
    await this.usersRepository.save(user);
    return;
  }

  getUserByToken(token: string) {
    return this.usersRepository.findOne({ where: { token } });
  }
}
