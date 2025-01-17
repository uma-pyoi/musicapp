import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { TrackHistoryService } from '../services/track_history.service';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';

@Controller('track_history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Post()
  async create(@Headers() headers: { authorization: string }, @Body() createTrackHistoryDto: CreateTrackHistoryDto) {
    if (!headers['authorization']) {
      throw new UnauthorizedException();
    }
    return this.trackHistoryService.create(headers, createTrackHistoryDto);
  }
}
