import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();

// Create Job Post
router.post('/', async (req: Request, res: Response) => {
  const { title, description, company, userId } = req.body;
  try {
    const jobPost = await prisma.jobPost.create({
      data: { title, description, company, userId },
    });
    res.status(201).json(jobPost);
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(500).json({ error: 'Failed to create job post' });
  }
});

// Get Job Post Details
router.get('/:id', async (req: Request, res: Response) => {
  const jobPostId = parseInt(req.params.id);
  try {
    const jobPost = await prisma.jobPost.findUnique({
      where: { id: jobPostId },
    });
    if (jobPost) {
      res.json(jobPost);
    } else {
      res.status(404).json({ error: 'Job post not found' });
    }
  } catch (error) {
    console.error('Error retrieving job post:', error);
    res.status(500).json({ error: 'Failed to retrieve job post' });
  }
});

// Get All Job Posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobPosts = await prisma.jobPost.findMany();
    res.json(jobPosts);
  } catch (error) {
    console.error('Error retrieving job posts:', error);
    res.status(500).json({ error: 'Failed to retrieve job posts' });
  }
});

// Update Job Post
router.put('/:id', async (req: Request, res: Response) => {
  const jobPostId = parseInt(req.params.id);
  const { title, description, company } = req.body;
  try {
    const jobPost = await prisma.jobPost.update({
      where: { id: jobPostId },
      data: { title, description, company },
    });
    res.json(jobPost);
  } catch (error) {
    console.error('Error updating job post:', error);
    res.status(500).json({ error: 'Failed to update job post' });
  }
});

// Delete Job Post
router.delete('/:id', async (req: Request, res: Response) => {
  const jobPostId = parseInt(req.params.id);
  try {
    await prisma.jobPost.delete({
      where: { id: jobPostId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting job post:', error);
    res.status(500).json({ error: 'Failed to delete job post' });
  }
});

export default router;
