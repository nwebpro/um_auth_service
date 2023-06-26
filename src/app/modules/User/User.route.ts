import express from 'express';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';
import { RequestValidation } from '../../middlewares/validateRequest';

const router = express.Router();

// Create Student Route
router.post(
  '/create-student',
  RequestValidation(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

// Create Faculty Route
router.post(
  '/create-faculty',
  RequestValidation(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

// Create Admin Route
router.post(
  '/create-admin',
  RequestValidation(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
