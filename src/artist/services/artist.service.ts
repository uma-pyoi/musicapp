import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto, image: Express.Multer.File) {
    return await this.artistsRepository.save({ ...createArtistDto, image: image?.filename || '' });
  }

  async findAll() {
    return this.artistsRepository.find();
  }
}
