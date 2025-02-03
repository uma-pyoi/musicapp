import { Role } from 'src/role/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ default: [Role.User] })
  role: Role;

  generateToken() {
    this.token = crypto.randomUUID();
  }
}
