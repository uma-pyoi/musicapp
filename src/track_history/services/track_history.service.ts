import { Injectable } from '@nestjs/common';
import { CreateTrackHistoryDto } from '../dto/create-track_history.dto';

@Injectable()
export class TrackHistoryService {
  create(createTrackHistoryDto: CreateTrackHistoryDto) {
    console.log(createTrackHistoryDto);
    return 'This action adds a new trackHistory';
  }

  findAll() {
    return `This action returns all trackHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackHistory`;
  }
}
