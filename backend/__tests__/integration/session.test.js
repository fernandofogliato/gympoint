import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

describe('Session', () => {
  it('should fail when pass a user that does not exists', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/session')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should generate JWT token', async () => {
    const user = await factory.attrs('User', {
      email: 'admin@gympoint.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.body).toHaveProperty('token');
  });
});
