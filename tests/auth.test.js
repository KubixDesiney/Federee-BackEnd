const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Authentication System', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  
  it('should authenticate a user with Web3', async () => {
    const res = await request(app)
      .post('/api/auth/web3')
      .send({
        token: 'test-web3-token'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});