import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { TrackFactoryMeta } from '../factories/track.factory';

export default class TrackSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const albumsRepository = dataSource.getRepository(Album);
    const albums = await albumsRepository.find();

    if (albums.length === 0) {
      return;
    }

    const TrackFactory = factoryManager.get(Track);

    for (const album of albums) {
      const trackFactoryMeta: TrackFactoryMeta = {
        albumId: album.id,
        trackNumberCounter: 1,
      };
      TrackFactory.setMeta(trackFactoryMeta);
      await TrackFactory.saveMany(7);
    }
  }
}
