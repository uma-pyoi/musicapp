import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';

export default class TrackSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('TrackSeeder')
    const trackSeeder = factoryManager.get(Track);
    await trackSeeder.saveMany(2);
  }
}
