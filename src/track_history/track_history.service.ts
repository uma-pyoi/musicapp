import { Injectable } from '@nestjs/common';
import { CreateTrackHistoryDto } from './dto/create-track_history.dto';
import { UpdateTrackHistoryDto } from './dto/update-track_history.dto';

@Injectable()
export class TrackHistoryService {
  create(createTrackHistoryDto: CreateTrackHistoryDto) {
    return 'This action adds a new trackHistory';
  }

  findAll() {
    return `This action returns all trackHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackHistory`;
  }

  update(id: number, updateTrackHistoryDto: UpdateTrackHistoryDto) {
    return `This action updates a #${id} trackHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} trackHistory`;
  }
}
