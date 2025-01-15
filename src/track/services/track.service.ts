import { Injectable } from '@nestjs/common';
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
    return this.tracksRepository.find();
  }

  async findAllOfAlbum(id: string) {
    return this.tracksRepository.find({
      where: { albumId: id },
      relations: { album: true },
    });
  }

  async findAllOfArtist(id: string) {
    const tracksArr = await this.findAll();
    const tracksOfAristArr = [];

    // async function getTracksOfArtist() {
    for (const track of tracksArr) {
      console.log('track = ', track);
      const albumResults = await this.albumsRepository.find({
        where: { id: track.albumId },
        // relations: { artist: true },
      });
      console.log('albumResults = ', albumResults);
      const albumOfTrack = albumResults[0];

      console.log('albumOfTrack = ', albumOfTrack);

      console.log('albumOfTrack.artistId = ', albumOfTrack.artistId);
      console.log('id = ', id);

      if (`${albumOfTrack.artistId}` === id) {
        console.log('albumOfTrack.artistId = ', albumOfTrack.artistId);
        tracksOfAristArr.push(track);
      }
    }
    return tracksOfAristArr;
  }
  // getTracksOfArtist();
  // console.log('tracksOfAristArr ', tracksOfAristArr);
}

// (await tracksArr).forEach(async (track) => {
//   console.log('track = ', track);
//   // const albumOfTrack = this.albumsRepository.findOneBy({ id: track.albumId });

//   console.log('this.albumsRepository.find ', async () => {
//     return this.albumsRepository.find();
//   });

//   const albumResults = await this.albumsRepository.find({
//     where: { id: track.albumId },
//     relations: { artist: true },
//   });
//   const albumOfTrack = albumResults[0];

//   console.log('albumOfTrack = ', albumOfTrack);

//   if (albumOfTrack.artistId === id) {
//     console.log('albumOfTrack.artistId = ', albumOfTrack.artistId);
//     return tracksOfAristArr.push(track);
//   }
// });
// }
// }
