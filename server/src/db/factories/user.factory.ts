import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export const UserFactory = setSeederFactory(User, async () => {
  const user = new User();

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash('password', salt);

  user.username = faker.internet.username();
  user.token = crypto.randomUUID();

  return user;
});
