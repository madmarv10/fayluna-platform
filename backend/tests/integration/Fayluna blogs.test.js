// integration/blogs.test.js

import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import Blog from '../src/models/Blog';
import User from '../src/models/User';
import { generateToken } from '../src/utils/jwt';

let token;
let userId;

beforeAll(async () => {
  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!'
  });
  userId = user._id;
  token = generateToken({ id: user._id });
});

afterAll(async () => {
  await Blog.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('Blog Routes', () => {
  it('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Integration Test Blog',
        description: 'This is a test blog post.',
        imageUrl: 'https://example.com/image.jpg',
        blogUrl: 'https://example.com/blog-post'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('blog');
    expect(res.body.blog.title).toBe('Integration Test Blog');
  });

  it('should fetch all blogs', async () => {
    const res = await request(app)
      .get('/api/blogs');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.blogs)).toBe(true);
  });

  it('should fetch blog by ID', async () => {
    const blog = await Blog.create({
      user: userId,
      title: 'Another Test Blog',
      description: 'More test content.',
      imageUrl: 'https://example.com/image2.jpg',
      blogUrl: 'https://example.com/blog-post-2'
    });

    const res = await request(app).get(`/api/blogs/${blog._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.blog.title).toBe('Another Test Blog');
  });
});

