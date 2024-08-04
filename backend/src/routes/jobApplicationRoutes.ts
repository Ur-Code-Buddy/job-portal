import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Apply for a Job
router.post('/', async (req: Request, res: Response) => {
  const { jobId, cohortStudentId } = req.body;
  try {
    // Ensure the job post and cohort student exist
    const jobPost = await prisma.jobPost.findUnique({ where: { id: jobId } });
    const cohortStudent = await prisma.cohortStudent.findUnique({ where: { id: cohortStudentId } });

    if (!jobPost || !cohortStudent) {
      return res.status(400).json({ error: 'Invalid job post or cohort student' });
    }

    const jobApplication = await prisma.jobApplication.create({
      data: { jobId, cohortStudentId },
    });
    res.status(201).json(jobApplication);
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ error: 'Failed to apply for job' });
  }
});

// Get Applications for a Job Post
router.get('/job/:jobId', async (req: Request, res: Response) => {
  const jobId = parseInt(req.params.jobId);
  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { jobId },
    });
    res.json(jobApplications);
  } catch (error) {
    console.error('Error retrieving job applications:', error);
    res.status(500).json({ error: 'Failed to retrieve job applications' });
  }
});

// Get Applications by Cohort Student
router.get('/cohortstudent/:cohortStudentId', async (req: Request, res: Response) => {
  const cohortStudentId = parseInt(req.params.cohortStudentId);
  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { cohortStudentId },
    });
    res.json(jobApplications);
  } catch (error) {
    console.error('Error retrieving applications by cohort student:', error);
    res.status(500).json({ error: 'Failed to retrieve applications by cohort student' });
  }
});

export default router;
