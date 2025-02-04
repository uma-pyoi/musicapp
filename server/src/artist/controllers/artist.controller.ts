import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storageConfig';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role/enums/role.enum';
import { AuthGuard } from 'src/user/authGuard/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(@Body() createArtistDto: CreateArtistDto, @UploadedFile() image: Express.Multer.File) {
    return this.artistService.create(createArtistDto, image);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.artistService.publish(id);
  }

  @Get()
  findAll() {
    return this.artistService.findAll(false);
  }

  @Get('/published')
  findAllPublished() {
    return this.artistService.findAll(true);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const artist = await this.artistService.findOne(id, false);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Get(':id/published')
  async findOnePublished(@Param('id') id: string) {
    const artist = await this.artistService.findOne(id, true);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteOne(@Param('id') id: string) {
    const artist = await this.artistService.findOne(id, false);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return this.artistService.delete(id);
  }
}
