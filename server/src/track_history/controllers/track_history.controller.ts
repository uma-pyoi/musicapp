import { Controller, Post, Body, Headers, UnauthorizedException, Get } from '@nestjs/common';
import { TrackHistoryService } from '../services/track_history.service';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';

@Controller('track-history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Post()
  async create(@Headers() headers: { authorization: string }, @Body() createTrackHistoryDto: CreateTrackHistoryDto) {
    if (!headers['authorization']) {
      throw new UnauthorizedException();
    }
    return this.trackHistoryService.create(headers, createTrackHistoryDto);
  }

  @Get()
  findAll(@Headers() headers: { authorization: string }) {
    if (headers['authorization']) {
      return this.trackHistoryService.findAllOfUserToken(headers);
    }
    return 'You need to be authorized';
  }
}
