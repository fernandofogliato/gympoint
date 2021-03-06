import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

describe('User', () => {
  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User');

    const compareHash = await bcrypt.compare(user.password, user.password_hash);
    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User', {
      email: 'teste@teste.com.br',
    });

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });

  it('should not be able to update with wrong confirm password', async () => {
    const user = await factory.attrs('User', {
      email: 'teste@teste.com.br',
      password: 123,
      confirmPassword: 456,
    });

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .put('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
});
