import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users:id', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.get('/enrollments', EnrollmentController.index);
routes.delete('/enrollments/:id', EnrollmentController.delete);

export default routes;
