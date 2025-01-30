import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const UserFactory = setSeederFactory(User, () => {
  console.log('UserFactory============');
  const user = new User();

  console.log('faker first Name = ', faker.person.firstName());
  user.password = 'password';
  user.username = faker.internet.username();

  return user;
});
