import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

export default class ArtistSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const artistFactory = factoryManager.get(Artist);
    await artistFactory.saveMany(3);
  }
}
