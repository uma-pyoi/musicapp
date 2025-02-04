import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus, Query, Delete, UseGuards } from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storageConfig';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role/enums/role.enum';
import { AuthGuard } from 'src/user/authGuard/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(@Body() createAlbumDto: CreateAlbumDto, @UploadedFile() image: Express.Multer.File) {
    return this.albumService.create(createAlbumDto, image);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.albumService.publish(id);
  }

  @Get()
  findAll(@Query('artist') artist: string) {
    if (artist) {
      return this.albumService.findAllOfArtistId(artist, false);
    }
    return this.albumService.findAll(false);
  }

  @Get('/published')
  findAllPublished(@Query('artist') artist: string) {
    if (artist) {
      return this.albumService.findAllOfArtistId(artist, true);
    }
    return this.albumService.findAll(true);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('invalid album id', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteOne(@Param('id') id: string) {
    console.log('aritst controller delete ', id);
    const artist = await this.albumService.findOne(id);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return this.albumService.delete(id);
  }
}
