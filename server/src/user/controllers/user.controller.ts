import { Controller, Post, Body, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { SignInUserDto } from '../dto/sign-in-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.userService.register(registerUserDto);
    } catch (e: any) {
      if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
        throw new ForbiddenException('This username is already in use');
      } else {
        throw new InternalServerErrorException('Something went wrong. . .');
      }
    }
  }

  @Post('sessions')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.userService.signIn(signInUserDto);
  }
}
