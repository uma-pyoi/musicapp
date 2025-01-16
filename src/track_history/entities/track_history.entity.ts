import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  trackId: string;

  @Column()
  datetime: string;
}
