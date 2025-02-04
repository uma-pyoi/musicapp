import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';
import { Repository } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.save(createTrackDto);
  }

  async findAll() {
    return this.tracksRepository.find({
      order: {
        trackNumber: 'ASC',
      },
    });
  }

  async findOne(id: string) {
    return this.tracksRepository.findOne({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.tracksRepository.delete(id);
  }

  async findAllOfAlbum(id: string) {
    return this.tracksRepository.find({
      where: { albumId: id },
      relations: { album: true },
      order: {
        trackNumber: 'ASC',
      },
    });
  }

  async findAllOfArtist(id: string) {
    const tracksArr = await this.findAll();
    const tracksOfAristArr = [];

    for (const track of tracksArr) {
      const albumResults = await this.albumsRepository.find({
        where: { id: track.albumId },
      });
      const albumOfTrack = albumResults[0];

      if (`${albumOfTrack.artistId}` === id) {
        tracksOfAristArr.push(track);
      }
    }
    return tracksOfAristArr;
  }

  async findAllPublished() {
    return this.tracksRepository.find({
      where: {
        published: true,
      },
    });
  }

  async publish(id: string) {
    const track = await this.findOne(id);

    if (!track) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    track.published = true;

    return await this.tracksRepository.save(track);
  }
}
