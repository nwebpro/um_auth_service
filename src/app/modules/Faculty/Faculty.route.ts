import express from 'express';
import { FacultyController } from './Faculty.controller';
import { FacultyValidation } from './Faculty.validation';
import { RequestValidation } from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  RequestValidation(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
