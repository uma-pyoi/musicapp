import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.password = 'password';
  user.username = faker.internet.username();

  return user;
});
