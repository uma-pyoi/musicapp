import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Track } from 'src/track/entities/track.entity';
import { appDataSource } from '../data-source';
import { Album } from 'src/album/entities/album.entity';

let trackNumberCounter = 1;

export const TrackFactory = setSeederFactory(Track, (__, meta: string) => {
  const track = new Track();

  track.title = faker.music.songName();
  const durationMinutes = faker.number.int({ min: 1, max: 12 }).toString();
  const durationSeconds = faker.number.int({ min: 1, max: 59 }).toString();
  let duration;
  if (durationSeconds.length < 2) {
    duration = `${durationMinutes}:0${durationSeconds}`;
  } else {
    duration = `${durationMinutes}:${durationSeconds}`;
  }
  track.duration = duration;

  track.albumId = meta;

  track.trackNumber = trackNumberCounter++;

  return track;
});
