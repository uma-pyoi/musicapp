import { Artist } from 'src/artist/entities/artist.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  releaseYear: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  artistId: string;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ default: false })
  published: boolean;
}
