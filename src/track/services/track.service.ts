import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.save(createTrackDto);
  }

  async findAll() {
    return this.tracksRepository.find();
  }

  async findAllOfAlbum(id: string) {
    return this.tracksRepository.find({
      where: { albumId: id },
      relations: { album: true },
    });
  }
}
