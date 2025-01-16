import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrackHistoryService } from '../services/track_history.service';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';

@Controller('track-history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Post()
  create(@Body() createTrackHistoryDto: CreateTrackHistoryDto) {
    return this.trackHistoryService.create(createTrackHistoryDto);
  }

  @Get()
  findAll() {
    return this.trackHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackHistoryService.findOne(+id);
  }
}
