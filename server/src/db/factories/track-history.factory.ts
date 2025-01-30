import { setSeederFactory } from 'typeorm-extension';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';
import { faker } from '@faker-js/faker';
import { appDataSource } from '../data-source';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const TrackHistoryFactory = setSeederFactory(TrackHistory, async () => {
  const trackHistory = new TrackHistory();

  const tracksRepository = appDataSource.getRepository(Track);
  const randomTrack: Track = await tracksRepository.find()[0];
  trackHistory.trackId = `${randomTrack.id}`;

  const usersRepository = appDataSource.getRepository(User);
  const randomUser: User = await usersRepository.find()[0];
  trackHistory.userId = `${randomUser.id}`;

  trackHistory.datetime = faker.date.recent().toLocaleString();

  return trackHistory;
});
