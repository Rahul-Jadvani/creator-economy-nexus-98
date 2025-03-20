
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import tokenRoutes from './routes/tokens';
import ticketRoutes from './routes/tickets';
import stakingRoutes from './routes/staking';
import raffleRoutes from './routes/raffles';
import interestRoutes from './routes/interests';
import nftRoutes from './routes/nfts';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/staking', stakingRoutes);
app.use('/api/raffles', raffleRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/nfts', nftRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'VYB-R8R API is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Database connection closed');
  process.exit(0);
});
