import { setSeederFactory } from 'typeorm-extension';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';
import { faker } from '@faker-js/faker';

export interface TrackHistoryMeta {
  randomTrackId: string;
  randomUserId: string;
}

export const TrackHistoryFactory = setSeederFactory(TrackHistory, (__, meta: TrackHistoryMeta) => {
  const trackHistory = new TrackHistory();

  trackHistory.trackId = meta.randomTrackId;

  trackHistory.userId = meta.randomUserId;

  trackHistory.datetime = faker.date.past().toLocaleString();

  return trackHistory;
});
