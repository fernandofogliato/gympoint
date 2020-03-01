import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

let token;

describe('Plan', () => {
  beforeEach(async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123456',
      });
    token = response.body.token;
  });

  it('should be able to register', async () => {
    const plan = await factory.attrs('Plan');

    const response = await request(app)
      .post('/plan')
      .set('Authorization', `Bearer ${token}`)
      .send(plan);

    expect(response.body).toHaveProperty('id');
  });
});
