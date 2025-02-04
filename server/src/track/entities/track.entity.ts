import { Album } from 'src/album/entities/album.entity';
import { TrackHistory } from 'src/track_history/entities/track_history.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  trackNumber: number;

  @Column()
  albumId: string;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column({ default: false })
  published: boolean;

  @OneToMany(() => TrackHistory, (trackHistory) => trackHistory.track, { cascade: ['remove'] })
  @JoinColumn({ name: 'trackId' })
  trackHistories: TrackHistory[];
}
