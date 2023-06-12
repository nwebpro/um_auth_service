import express from 'express';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';
import { RequestValidation } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  RequestValidation(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
