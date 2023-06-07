import express from 'express';
import { AcademicSemesterValidation } from './AcademicSemester.validation';
import { RequestValidation } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './AcademicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  RequestValidation(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
