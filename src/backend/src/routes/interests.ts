
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

// Add user interests
router.post('/user', async (req, res) => {
  try {
    const { userId, interestIds } = req.body;
    
    if (!userId || !interestIds || !Array.isArray(interestIds)) {
      return res.status(400).json({ message: 'User ID and interest IDs array required' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add interests to user
    await prisma.user.update({
      where: { id: userId },
      data: {
        interests: {
          connect: interestIds.map(id => ({ id }))
        }
      }
    });
    
    res.status(200).json({ message: 'Interests added successfully' });
  } catch (error) {
    console.error('Add interests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user interests
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interests: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user.interests);
  } catch (error) {
    console.error('Get user interests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
