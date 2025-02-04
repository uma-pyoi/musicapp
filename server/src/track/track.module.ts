import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { IsUniqueTrackNumberConstraint } from 'src/validators/isUniqueTrackNumber';
import { Artist } from 'src/artist/entities/artist.entity';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Track, Album, Artist, User])],
  controllers: [TrackController],
  providers: [TrackService, IsUniqueTrackNumberConstraint, UserService],
  exports: [TypeOrmModule],
})
export class TrackModule {}
