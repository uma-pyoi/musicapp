import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

export default class TrackSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('TrackSeeder');
    const albumsRepository = dataSource.getRepository(Album);
    const albums = await albumsRepository.find();

    if (albums.length === 0) {
      console.error('No albums found in the database. Seeding failed.');
      return;
    }

    const album = albums[0];
    console.log('Album found: ', album);

    const TrackFactory = factoryManager.get(Track);
    TrackFactory.setMeta(album.id);
    await TrackFactory.saveMany(2);
  }
}
