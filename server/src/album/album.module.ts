import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Album]), TypeOrmModule.forFeature([Track, User])],
  controllers: [AlbumController],
  providers: [AlbumService, UserService],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
