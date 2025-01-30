import { SeederFactoryContext, setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Album } from 'src/album/entities/album.entity';
import { appDataSource } from '../data-source';
import { Artist } from 'src/artist/entities/artist.entity';
import { DataSource } from 'typeorm';

export const AlbumFactory = setSeederFactory(Album, async (__, artistsRepository) => {
  console.log('Album Factory');
  const album = new Album();

  album.title = faker.music.album();
  album.releaseYear = faker.number.int({ min: 1000, max: 2025 }).toString();

  // const artistsRepository = await appDataSource.getRepository(Artist);
  // const artistsRepository = factoryContext.getRepository(Artist);
  console.log('all artists = ', await artistsRepository.find());
  const randomArtist: Artist = await artistsRepository.find()[0];
  console.log('Album Factory: random Artist = ', randomArtist);
  album.artistId = `${randomArtist.id}`;

  return album;
});
