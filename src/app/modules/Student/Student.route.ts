import express from 'express';
import { StudentController } from './Student.controller';
import { RequestValidation } from '../../middlewares/validateRequest';
import { StudentValidation } from './Student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  RequestValidation(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
