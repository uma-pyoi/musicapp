import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Artist } from 'src/artist/entities/artist.entity';
import 'dotenv/config';

export const ArtistFactory = setSeederFactory(Artist, () => {
  const artist = new Artist();

  artist.name = faker.music.artist();
  artist.info = faker.music.genre();
  artist.image = `artist-default.jpeg`;

  return artist;
});
