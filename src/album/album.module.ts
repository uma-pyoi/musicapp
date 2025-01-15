import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
