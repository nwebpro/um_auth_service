import express from 'express';
import { AdminController } from './Admin.controller';
import { RequestValidation } from '../../middlewares/validateRequest';
import { AdminValidation } from './Admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  RequestValidation(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
