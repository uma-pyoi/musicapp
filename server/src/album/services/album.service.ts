import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, image: Express.Multer.File) {
    return await this.albumsRepository.save({ ...createAlbumDto, image: image?.filename || '' });
  }

  async findAll() {
    const albumsArr = await this.albumsRepository.find({
      order: {
        releaseYear: 'ASC',
      },
    });

    const newAlbumsArr = [];

    for (const album of albumsArr) {
      const tracksArr = await this.tracksRepository.find({
        where: { albumId: album.id },
      });
      newAlbumsArr.push({ ...album, tracksAmount: tracksArr.length });
    }

    return newAlbumsArr;
  }

  async findAllOfArtistId(id: string) {
    const albumsArr = await this.albumsRepository.find({
      where: { artistId: id },
      relations: { artist: true },
      order: {
        releaseYear: 'ASC',
      },
    });

    const newAlbumsArr = [];

    for (const album of albumsArr) {
      const tracksArr = await this.tracksRepository.find({
        where: { albumId: album.id },
      });
      newAlbumsArr.push({ ...album, tracksAmount: tracksArr.length });
    }

    return newAlbumsArr;
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOne({
      where: { id },
      relations: { artist: true },
    });
  }
}
