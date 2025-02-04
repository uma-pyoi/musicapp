import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) { }

  async create(createArtistDto: CreateArtistDto, image: Express.Multer.File) {
    return await this.artistsRepository.save({ ...createArtistDto, image: image?.filename || '' });
  }

  async findAll(published: boolean) {
    return this.artistsRepository.find({
      where: {
        published: published,
      },
    });
  }

  async findOne(id: string, published: boolean): Promise<Artist> {
    return this.artistsRepository.findOne({
      where: { id, published },
    });
  }

  async delete(id: string) {
    return this.artistsRepository.delete(id);
  }

  async publish(id: string) {
    const artist = await this.findOne(id, false);

    if (!artist) {
      throw new HttpException('invalid artist id', HttpStatus.NOT_FOUND);
    }

    artist.published = true;

    return await this.artistsRepository.save(artist);
  }
}
