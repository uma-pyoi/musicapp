import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Track } from 'src/track/entities/track.entity';

export interface TrackFactoryMeta {
  trackNumberCounter: number;
  albumId: string;
}

export const TrackFactory = setSeederFactory(Track, (__, meta: TrackFactoryMeta) => {
  const track = new Track();

  track.title = faker.music.songName();
  const durationMinutes = faker.number.int({ min: 1, max: 12 }).toString();
  const durationSeconds = faker.number.int({ min: 1, max: 59 }).toString();
  let duration: string;
  if (durationSeconds.length < 2) {
    duration = `${durationMinutes}:0${durationSeconds}`;
  } else {
    duration = `${durationMinutes}:${durationSeconds}`;
  }
  track.duration = duration;

  track.albumId = meta.albumId;

  track.trackNumber = meta.trackNumberCounter++;

  return track;
});
