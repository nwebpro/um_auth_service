import express from 'express';
import { RequestValidation } from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './AcademicDepartment.validation';
import { AcademicDepartmentController } from './AcademicDepartment.controller';
const router = express.Router();

router.post(
  '/create-department',
  RequestValidation(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

export const AcademicDepartmentRoutes = router;
