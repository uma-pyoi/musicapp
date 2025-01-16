import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @Expose()
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Enter the username' })
  username!: string;

  @Expose()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Enter the password' })
  password!: string;
}
