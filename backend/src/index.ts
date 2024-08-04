import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// Import route modules
import userRoutes from './routes/userRoutes';
import cohortStudentRoutes from './routes/cohortStudentRoutes';
import jobPostRoutes from './routes/jobPostRoutes';
import jobApplicationRoutes from './routes/jobApplicationRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/api/users', userRoutes);
app.use('/api/cohortstudents', cohortStudentRoutes);
app.use('/api/jobposts', jobPostRoutes);
app.use('/api/jobapplications', jobApplicationRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Base server is working');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
