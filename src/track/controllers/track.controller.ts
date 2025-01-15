import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { CreateTrackDto } from '../dto/create-track.dto';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
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
}
