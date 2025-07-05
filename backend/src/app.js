import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/Fayluna auth.js';
import userRoutes from './routes/Fayluna users.js';
import blogRoutes from './routes/Fayluna blogs.js';
import bookmarkRoutes from './routes/Fayluna bookmarks.js';
import analyticsRoutes from './routes/Fayluna analytics.js';
import uploadRoutes from './routes/Fayluna upload.js';

// Import middleware
import { errorHandler } from './middleware/Fayluna errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window per IP
});
app.use(limiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

export default app;

