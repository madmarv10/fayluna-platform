// tests/auth.test.js

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI || 'mongodb://localhost:27017/blog_platform_test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  const userData = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', userData.email);
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(400);
  });

  it('should login a registered user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', userData.email);
  });

  it('should not login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: 'WrongPassword'
      });

    expect(res.statusCode).toBe(401);
  });
});
