import express from 'express';
import { RequestValidation } from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './AcademicFaculty.validation';
import { AcademicFacultyController } from './AcademicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academic-semester',
  RequestValidation(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  RequestValidation(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
