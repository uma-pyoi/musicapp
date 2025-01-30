import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Album } from 'src/album/entities/album.entity';

export const AlbumFactory = setSeederFactory(Album, (__, meta: string) => {
  console.log('Album Factory');
  const album = new Album();

  album.title = faker.music.album();
  album.releaseYear = faker.number.int({ min: 1000, max: 2025 }).toString();

  console.log('Album Factory: random Artist id = ', meta);
  album.artistId = meta;

  return album;
});
