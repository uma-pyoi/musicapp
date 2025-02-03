import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @Expose()
  @IsNotEmpty({ message: 'Album should have a title' })
  @IsString({ message: "Album's title should be a string" })
  title!: string;

  @Expose()
  @IsOptional()
  image?: Express.Multer.File;

  @Expose()
  @IsNotEmpty({ message: 'Album should have the release year' })
  @IsNumberString({}, { message: "Album's release year should be a string" })
  releaseYear!: string;

  @Expose()
  @IsNotEmpty({ message: "Album should have an artist's id" })
  @IsNumberString({}, { message: "Enter album's artist's id correctly" })
  artistId!: string;
}
