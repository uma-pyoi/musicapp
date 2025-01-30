import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { TrackHistoryMeta } from '../factories/track-history.factory';

export default class TrackHistorySeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const tracksRepository = dataSource.getRepository(Track);
    const tracks = await tracksRepository.find();

    if (tracks.length === 0) {
      return;
    }

    const track = tracks[0];

    const usersRepository = dataSource.getRepository(User);
    const users = await usersRepository.find();

    if (users.length === 0) {
      return;
    }

    const user = users[0];

    const TrackHistoryFactory = factoryManager.get(TrackHistory);
    const trackHistoryMeta: TrackHistoryMeta = {
      randomTrackId: track.id,
      randomUserId: user.id,
    };
    TrackHistoryFactory.setMeta(trackHistoryMeta);

    await TrackHistoryFactory.saveMany(2);
  }
}
