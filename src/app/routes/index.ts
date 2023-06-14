import express from 'express';
import { UserRoutes } from '../modules/User/User.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/AcademicSemester.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/AcademicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/AcademicDepartment.route';
import { StudentRoutes } from '../modules/Student/Student.route';
import { FacultyRoutes } from '../modules/Faculty/Faculty.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
