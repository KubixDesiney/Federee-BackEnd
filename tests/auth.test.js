// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Auth Flow', function () {
  this.timeout(5000); // in case startup is slow

  it('should fail without ID token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Missing idToken');
  });
});

