import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackHistory } from '../entities/track_history.entity';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class TrackHistoryService {
  constructor(
    @InjectRepository(TrackHistory)
    private tracksHistoryRepository: Repository<TrackHistory>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(headers: { authorization: string }, createTrackHistoryDto: CreateTrackHistoryDto) {
    const user = await this.usersRepository.findOne({ where: { token: headers['authorization'] } });
    if (!user) {
      throw new ForbiddenException();
    }

    const track = await this.tracksRepository.findOne({ where: { id: createTrackHistoryDto.trackId } });
    if (!track) {
      throw new BadRequestException();
    }

    const now = new Date();
    const formattedTime = now.toLocaleString();

    return this.tracksHistoryRepository.save({ ...createTrackHistoryDto, userId: user.id, datetime: formattedTime });
  }

  async findAllOfUserToken(headers: { authorization: string }) {
    const user = await this.usersRepository.findOne({ where: { token: headers['authorization'] } });
    if (!user) {
      throw new ForbiddenException();
    }

    const trackHistoriesArr = await this.tracksHistoryRepository.find({
      where: { userId: user.id },
      relations: { track: { album: true } },
      order: {
        datetime: 'DESC',
      },
    });
    const finalTrackHistoriesArr = [];

    for (const trackHistory of trackHistoriesArr) {
      const artist = await this.artistsRepository.findOne({
        where: { id: trackHistory.track.album.artistId },
      });

      const finalTrackHistory = {
        ...trackHistory,
        artist,
      };

      finalTrackHistoriesArr.push(finalTrackHistory);
    }

    return finalTrackHistoriesArr;
  }
}
