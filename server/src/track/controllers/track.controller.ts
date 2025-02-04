import { Controller, Get, Post, Body, Query, Delete, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role/enums/role.enum';
import { AuthGuard } from 'src/user/authGuard/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.trackService.publish(id);
  }

  @Get()
  findAll(@Query('album') album?: string, @Query('artist') artist?: string) {
    if (album) {
      return this.trackService.findAllOfAlbum(album, false);
    } else if (artist) {
      return this.trackService.findAllOfArtist(artist, false);
    }
    return this.trackService.findAll(false);
  }

  @Get('/published')
  findAllPublished(@Query('album') album?: string, @Query('artist') artist?: string) {
    if (album) {
      return this.trackService.findAllOfAlbum(album, true);
    } else if (artist) {
      return this.trackService.findAllOfArtist(artist, true);
    }
    return this.trackService.findAll(true);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteOne(@Param('id') id: string) {
    const artist = await this.trackService.findOne(id);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return this.trackService.delete(id);
  }
}
