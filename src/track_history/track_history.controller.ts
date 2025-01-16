import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackHistoryService } from './track_history.service';
import { CreateTrackHistoryDto } from './dto/create-track_history.dto';
import { UpdateTrackHistoryDto } from './dto/update-track_history.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackHistoryDto: UpdateTrackHistoryDto) {
    return this.trackHistoryService.update(+id, updateTrackHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackHistoryService.remove(+id);
  }
}
