import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, image: Express.Multer.File) {
    return await this.albumsRepository.save({ ...createAlbumDto, image: image?.filename || '' });
  }

  async findAll() {
    return this.albumsRepository.find();
  }

  async findAllOfArtistId(id: string) {
    return this.albumsRepository.find({
      where: { artistId: id },
      relations: { artist: true },
    });
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOne({
      where: { id },
      relations: { artist: true },
    });
  }
}
