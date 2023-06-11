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
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
