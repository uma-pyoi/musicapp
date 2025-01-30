import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Album } from 'src/album/entities/album.entity';

export const AlbumFactory = setSeederFactory(Album, () => {
  const album = new Album();

  album.title = faker.music.album();
  album.releaseYear = faker.number.int({ min: 1000, max: 2025 }).toString();
  album.artistId = '1';

  return album;
});
