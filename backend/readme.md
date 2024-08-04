# Job Application System API

## Overview

This document provides an overview of the available APIs for the Job Application System. The API enables user management, cohort student management, job post management, and job application management.

## API Endpoints

### User Management

- **`POST /api/users`**: Create a new user.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "name": "User Name"
    }
    ```
  - **Response**: The newly created user object.

- **`GET /api/users/:id`**: Retrieve a user's details by ID.
  - **Response**: User object.

- **`GET /api/users`**: Retrieve a list of all users.
  - **Response**: Array of user objects.

- **`PUT /api/users/:id`**: Update a user's details by ID.
  - **Request Body**: 
    ```json
    {
      "email": "newemail@example.com",
      "name": "New Name"
    }
    ```
  - **Response**: Updated user object.

- **`DELETE /api/users/:id`**: Delete a user by ID.
  - **Response**: HTTP status 204 (No Content).

### Cohort Student Management

- **`POST /api/cohortstudents`**: Create a new cohort student.
  - **Request Body**: 
    ```json
    {
      "email": "student@example.com",
      "name": "Student Name"
    }
    ```
  - **Response**: The newly created cohort student object.

- **`GET /api/cohortstudents/:id`**: Retrieve a cohort student's details by ID.
  - **Response**: Cohort student object.

- **`GET /api/cohortstudents`**: Retrieve a list of all cohort students.
  - **Response**: Array of cohort student objects.

- **`PUT /api/cohortstudents/:id`**: Update a cohort student's details by ID.
  - **Request Body**: 
    ```json
    {
      "email": "newemail@example.com",
      "name": "New Name"
    }
    ```
  - **Response**: Updated cohort student object.

- **`DELETE /api/cohortstudents/:id`**: Delete a cohort student by ID.
  - **Response**: HTTP status 204 (No Content).

### Job Post Management

- **`POST /api/jobposts`**: Create a new job post.
  - **Request Body**: 
    ```json
    {
      "title": "Job Title",
      "description": "Job Description",
      "company": "Company Name",
      "userId": 1
    }
    ```
  - **Response**: The newly created job post object.

- **`GET /api/jobposts/:id`**: Retrieve a job post's details by ID.
  - **Response**: Job post object.

- **`GET /api/jobposts`**: Retrieve a list of all job posts.
  - **Response**: Array of job post objects.

- **`PUT /api/jobposts/:id`**: Update a job post's details by ID.
  - **Request Body**: 
    ```json
    {
      "title": "Updated Job Title",
      "description": "Updated Job Description",
      "company": "Updated Company Name"
    }
    ```
  - **Response**: Updated job post object.

- **`DELETE /api/jobposts/:id`**: Delete a job post by ID.
  - **Response**: HTTP status 204 (No Content).

### Job Application Management

- **`POST /api/jobapplications`**: Apply for a job.
  - **Request Body**: 
    ```json
    {
      "jobId": 1,
      "cohortStudentId": 1
    }
    ```
  - **Response**: The newly created job application object.

- **`GET /api/jobapplications/job/:jobId`**: Retrieve all applications for a specific job post.
  - **Response**: Array of job application objects.

- **`GET /api/jobapplications/cohortstudent/:cohortStudentId`**: Retrieve all job applications made by a specific cohort student.
  - **Response**: Array of job application objects.
