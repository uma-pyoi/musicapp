import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Artist } from 'src/artist/entities/artist.entity';

export const ArtistFactory = setSeederFactory(Artist, () => {
  const artist = new Artist();

  artist.name = faker.music.artist();
  artist.info = faker.music.genre();

  return artist;
});
