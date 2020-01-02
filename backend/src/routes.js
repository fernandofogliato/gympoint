import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PendentHelpOrderController from './app/controllers/PendentHelpOrderController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users:id', UserController.update);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.put('/help-orders/:id', PendentHelpOrderController.update);
routes.get('/help-orders/pendents', PendentHelpOrderController.index);

export default routes;
