import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTrackHistoryDto {
  @Expose()
  @IsNotEmpty({ message: 'Enter track id' })
  @IsNumberString({}, { message: 'Enter track id correctly' })
  trackId!: string;
}
