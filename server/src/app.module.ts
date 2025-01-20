import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { UserModule } from './user/user.module';
import { TrackHistoryModule } from './track_history/track_history.module';
import { User } from './user/entities/user.entity';
import { TrackHistory } from './track_history/entities/track_history.entity';
import { IsUniqueTrackNumberConstraint } from './validators/isUniqueTrackNumber';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Artist, Album, Track, User, TrackHistory],
      synchronize: true,
    }),
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    TrackHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueTrackNumberConstraint],
})
export class AppModule {}
