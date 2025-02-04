import { Album } from 'src/album/entities/album.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: false })
  published: boolean;

  @OneToMany(() => Album, (album) => album.artist, { cascade: ['remove'] })
  @JoinColumn({ name: 'artistId' })
  albums: Album[];
}
