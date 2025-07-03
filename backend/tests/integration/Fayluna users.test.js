// integration/users.test.js

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../src/config/server');

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/bloghub_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  });
  await user.save();
  userId = user._id;

  token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('User API Integration Tests', () => {
  it('should get user profile', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'Hello, I am a test user.' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('bio', 'Hello, I am a test user.');
  });

  it('should follow another user', async () => {
    const otherUser = new User({
      username: 'otheruser',
      email: 'otheruser@example.com',
      password: 'password123',
    });
    await otherUser.save();

    const res = await request(app)
      .post(`/api/users/${otherUser._id}/follow`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User followed');
  });
});

