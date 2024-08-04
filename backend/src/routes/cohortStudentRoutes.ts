import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();

// Create Cohort Student
router.post('/', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const cohortStudent = await prisma.cohortStudent.create({
      data: { email, name },
    });
    res.status(201).json(cohortStudent);
  } catch (error) {
    console.error('Error creating cohort student:', error);
    res.status(500).json({ error: 'Failed to create cohort student' });
  }
});

// Get Cohort Student Details
router.get('/:id', async (req: Request, res: Response) => {
  const cohortStudentId = parseInt(req.params.id);
  try {
    const cohortStudent = await prisma.cohortStudent.findUnique({
      where: { id: cohortStudentId },
    });
    if (cohortStudent) {
      res.json(cohortStudent);
    } else {
      res.status(404).json({ error: 'Cohort student not found' });
    }
  } catch (error) {
    console.error('Error retrieving cohort student:', error);
    res.status(500).json({ error: 'Failed to retrieve cohort student' });
  }
});

// Update Cohort Student
router.put('/:id', async (req: Request, res: Response) => {
  const cohortStudentId = parseInt(req.params.id);
  const { email, name } = req.body;
  try {
    const cohortStudent = await prisma.cohortStudent.update({
      where: { id: cohortStudentId },
      data: { email, name },
    });
    res.json(cohortStudent);
  } catch (error) {
    console.error('Error updating cohort student:', error);
    res.status(500).json({ error: 'Failed to update cohort student' });
  }
});

// Delete Cohort Student
router.delete('/:id', async (req: Request, res: Response) => {
  const cohortStudentId = parseInt(req.params.id);
  try {
    await prisma.cohortStudent.delete({
      where: { id: cohortStudentId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting cohort student:', error);
    res.status(500).json({ error: 'Failed to delete cohort student' });
  }
});

export default router;
