import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storageConfig';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(@Body() createAlbumDto: CreateAlbumDto, @UploadedFile() image: Express.Multer.File) {
    return this.albumService.create(createAlbumDto, image);
  }

  @Get()
  findAll(@Query('artist') artist: string) {
    if (artist) {
      return this.albumService.findAllOfArtistId(artist);
    }
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('invalid album id', HttpStatus.NOT_FOUND);
    }

    return album;
  }
}
