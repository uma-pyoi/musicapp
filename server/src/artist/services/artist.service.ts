import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOne({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.artistsRepository.delete(id);
  }
}
