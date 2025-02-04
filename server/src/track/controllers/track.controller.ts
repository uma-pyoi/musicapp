import { Controller, Get, Post, Body, Query, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { CreateTrackDto } from '../dto/create-track.dto';

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
      return this.trackService.findAllOfAlbum(album);
    } else if (artist) {
      return this.trackService.findAllOfArtist(artist);
    }
    return this.trackService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const artist = await this.trackService.findOne(id);
    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    return this.trackService.delete(id);
  }
}
