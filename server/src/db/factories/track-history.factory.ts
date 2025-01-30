import { setSeederFactory } from 'typeorm-extension';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';

export const TrackHistoryFactory = setSeederFactory(TrackHistory, () => {
  const trackHistory = new TrackHistory();

  trackHistory.trackId = '1';
  trackHistory.userId = '1';

  return trackHistory;
});
