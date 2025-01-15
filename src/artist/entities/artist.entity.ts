// import { Album } from 'src/album/entities/album.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  info?: string;

  // @OneToMany(() => Album, (album) => album.artist)
  // @JoinColumn({ name: 'artistId' })
  // albums: Album[];
}
