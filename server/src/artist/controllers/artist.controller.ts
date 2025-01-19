import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storageConfig';


@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(@Body() createArtistDto: CreateArtistDto, @UploadedFile() image: Express.Multer.File) {
    return this.artistService.create(createArtistDto, image);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}
