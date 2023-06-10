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

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  RequestValidation(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
