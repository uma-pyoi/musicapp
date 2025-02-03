import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Artist, User])],
  controllers: [ArtistController],
  providers: [ArtistService, UserService],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
