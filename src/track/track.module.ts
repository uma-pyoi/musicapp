import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Track]), TypeOrmModule.forFeature([Album])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TypeOrmModule],
})
export class TrackModule {}
