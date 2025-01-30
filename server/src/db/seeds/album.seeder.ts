import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export default class AlbumSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('AlbumSeeder');
    const artistsRepository = dataSource.getRepository(Artist);
    const albumFactory = factoryManager.get(Album);
    await albumFactory.saveMany(2);
  }
}
