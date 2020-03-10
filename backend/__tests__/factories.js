import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Plan from '../src/app/models/Plan';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Plan', Plan, {
  title: faker.company.companyName(),
  duration: faker.random.number({
    min: 1,
    max: 5,
  }),
  price: faker.commerce.price(),
});

export default factory;
