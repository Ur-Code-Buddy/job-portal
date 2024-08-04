import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();

// Create User
router.post('/', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get User Details
router.get('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// Update User
router.put('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete User
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
