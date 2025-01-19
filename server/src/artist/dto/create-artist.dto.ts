import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @Expose()
  @IsNotEmpty({ message: 'Artist should have a name' })
  @IsString({ message: "Artist's name should be a string" })
  name!: string;

  @Expose()
  @IsOptional()
  image?: Express.Multer.File;

  @Expose()
  @IsOptional()
  @IsString({ message: "Artist's info should be a string" })
  info?: string;
}
