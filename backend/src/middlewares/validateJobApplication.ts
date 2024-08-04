import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Define a schema for job applications using zod
const jobApplicationSchema = z.object({
  jobId: z.number().int().positive(),
  cohortStudentId: z.number().int().positive(),
});

export const validateJobApplication = (req: Request, res: Response, next: NextFunction) => {
  try {
    jobApplicationSchema.parse(req.body);
    next(); 
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: 'Invalid request data',
        details: err.errors, 
      });
    } else {
      // Handle unexpected errors
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
};
