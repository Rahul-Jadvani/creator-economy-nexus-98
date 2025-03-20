
import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Get all interests
router.get('/', async (req, res) => {
  try {
    const interests = await prisma.interest.findMany();
    
    res.status(200).json(interests);
  } catch (error) {
    console.error('Get interests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
