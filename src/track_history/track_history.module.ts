import { Module } from '@nestjs/common';
import { TrackHistoryService } from './track_history.service';
import { TrackHistoryController } from './track_history.controller';

@Module({
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService],
})
export class TrackHistoryModule {}
