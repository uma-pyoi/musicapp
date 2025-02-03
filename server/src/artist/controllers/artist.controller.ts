import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storageConfig';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role/enums/role.enum';
import { AuthGuard } from 'src/user/auth_guard/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

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

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return artist;
  }
}
