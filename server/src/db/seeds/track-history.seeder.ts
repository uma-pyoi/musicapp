import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';

export default class TrackHistorySeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('TrackHistorySeeder');
    const trackHistorySeeder = factoryManager.get(TrackHistory);
    await trackHistorySeeder.saveMany(2);
  }
}
