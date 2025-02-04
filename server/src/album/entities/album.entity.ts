import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ default: false })
  published: boolean;

  @OneToMany(() => Track, (track) => track.album, { cascade: ['remove'] })
  @JoinColumn({ name: 'albumId' })
  tracks: Track[];
}
