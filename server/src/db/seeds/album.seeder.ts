import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export default class AlbumSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('AlbumSeeder');
    // const artistsFactory = factoryManager.get(Artist);
    // const artist = await artistsFactory.save();

    const artistsRepository = dataSource.getRepository(Artist);
    const artists = await artistsRepository.find();

    if (artists.length === 0) {
      console.error('No artists found in the database. Seeding failed.');
      return;
    }

    const artist = artists[0];
    console.log('Artist found: ', artist);

    const albumsFactory = factoryManager.get(Album);
    albumsFactory.setMeta(artist.id);

    await albumsFactory.saveMany(2);
  }
}
