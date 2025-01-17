import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackHistory } from '../entities/track_history.entity';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class TrackHistoryService {
  constructor(
    @InjectRepository(TrackHistory)
    private tracksHistoryRepository: Repository<TrackHistory>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(headers: { authorization: string }, createTrackHistoryDto: CreateTrackHistoryDto) {
    const user = await this.usersRepository.findOne({ where: { token: headers['authorization'] } });
    if (!user) {
      throw new ForbiddenException();
    }
    console.log(user);

    const track = await this.tracksRepository.findOne({ where: { id: createTrackHistoryDto.trackId } });
    if (!track) {
      throw new BadRequestException();
    }

    const now = new Date();
    const formattedTime = now.toLocaleString();

    this.tracksHistoryRepository.save({ ...createTrackHistoryDto, userId: user.id, datetime: formattedTime });
  }
}
