import express from 'express';
import { UserRoutes } from '../modules/User/User.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/AcademicSemester.route';

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
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
