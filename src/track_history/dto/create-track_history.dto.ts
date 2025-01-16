import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTrackHistoryDto {
  @Expose()
  @IsNotEmpty({ message: 'Enter user id' })
  @IsNumberString({}, { message: 'Enter user id correctly' })
  userId!: string;

  @Expose()
  @IsNotEmpty({ message: 'Enter track id' })
  @IsNumberString({}, { message: 'Enter track id correctly' })
  trackId!: string;
}
