import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Track)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, image: Express.Multer.File) {
    return await this.albumsRepository.save({ ...createAlbumDto, image: image?.filename || '' });
  }

  async findAll(published: boolean) {
    const albumsArr = await this.albumsRepository.find({
      order: {
        releaseYear: 'ASC',
      },
      where: {
        published,
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

  async findAllOfArtistId(id: string, published: boolean) {
    const albumsArr = await this.albumsRepository.find({
      where: { artistId: id, published },
      relations: { artist: true },
      order: {
        releaseYear: 'ASC',
      },
    });

    const newAlbumsArr = [];

    for (const album of albumsArr) {
      const tracksArr = await this.tracksRepository.find({
        where: { albumId: album.id, published },
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

  async delete(id: string) {
    return this.albumsRepository.delete(id);
  }

  async publish(id: string) {
    const album = await this.findOne(id);

    if (!album) {
      throw new HttpException('invalid album id', HttpStatus.NOT_FOUND);
    }

    // const artist = await this.artistsRepository.findOne({
    //   where: {
    //     id: album.artistId,
    //     published: true,
    //   },
    // });

    // console.log(artist, ' !!!!!! ARTIST OF THE ALBUM');

    // if (!artist) {
    //   throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    // }

    album.published = true;

    return await this.albumsRepository.save(album);
  }
}
