import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import UserSeeder from '../user.seeder';
import ArtistSeeder from '../artist.seeder';
import AlbumSeeder from '../album.seeder';
import TrackSeeder from '../track.seeder';
import TrackHistorySeeder from '../track-history.seeder';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await new UserSeeder().run(dataSource, factoryManager);
    console.log('Users seeded');

    await new ArtistSeeder().run(dataSource, factoryManager);
    console.log('Artists seeded');

    await new AlbumSeeder().run(dataSource, factoryManager);
    console.log('Albums seeded');

    await new TrackSeeder().run(dataSource, factoryManager);
    console.log('Tracks seeded');

    await new TrackHistorySeeder().run(dataSource, factoryManager);
    console.log('Track History seeded');
  }
}
