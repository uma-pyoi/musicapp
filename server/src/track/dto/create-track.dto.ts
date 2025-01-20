import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { isUniqueTrackNumber } from 'src/validators/isUniqueTrackNumber';

export class CreateTrackDto {
  @Expose()
  @IsNotEmpty({ message: 'Track should have a title' })
  @IsString({ message: "Track's title should be a string" })
  title!: string;

  @Expose()
  @IsNotEmpty({ message: "Track's duration should not be empty" })
  @IsString({ message: "Track's duration should be a string" })
  duration!: string;

  @Expose()
  @IsNotEmpty({ message: "Track should have an album's id" })
  @IsNumberString({}, { message: "Enter track's album's id correctly" })
  albumId!: string;

  @Expose()
  @IsNotEmpty({ message: 'Track should have a track number' })
  @IsNumber({}, { message: 'Track number should be a number' })
  @isUniqueTrackNumber({ albumId: 'albumId', column: 'trackNumber' })
  trackNumber: number;
}
