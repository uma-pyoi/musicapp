import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  info?: string;
}
