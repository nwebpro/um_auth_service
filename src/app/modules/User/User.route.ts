import express from 'express';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';
import { RequestValidation } from '../../middlewares/validateRequest';
import { FacultyValidation } from '../Faculty/Faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  RequestValidation(UserValidation.createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  RequestValidation(FacultyValidation.createFacultyZodSchema),
  UserController.createFaculty
);

export const UserRoutes = router;
