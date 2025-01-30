import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export default class AlbumSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const artistsRepository = dataSource.getRepository(Artist);
    const artists = await artistsRepository.find();

    if (artists.length === 0) {
      return;
    }

    const artist = artists[0];
    const albumsFactory = factoryManager.get(Album);
    albumsFactory.setMeta(artist.id);

    await albumsFactory.saveMany(2);
  }
}
