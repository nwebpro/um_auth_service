import express from 'express';
import { RequestValidation } from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './ManagementDepartment.validation';
import { ManagementDepartmentController } from './ManagementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  RequestValidation(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/:id', ManagementDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  RequestValidation(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete('/:id', ManagementDepartmentController.deleteDepartment);

router.get('/', ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
