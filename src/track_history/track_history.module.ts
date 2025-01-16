import { Module } from '@nestjs/common';
import { TrackHistoryService } from './services/track_history.service';
import { TrackHistoryController } from './controllers/track_history.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackHistory } from './entities/track_history.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([TrackHistory])],
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService],
})
export class TrackHistoryModule {}
