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
  findAll(@Query('album') album: string) {
    if (album) {
      return this.trackService.findAllOfAlbum(album);
    }
    return this.trackService.findAll();
  }
}
