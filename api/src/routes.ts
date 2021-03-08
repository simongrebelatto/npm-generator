import { Router } from 'express';
import { sendMailController } from './database/controllers/sendMailController';
import { surveyController } from './database/controllers/surveyController';
import { userController } from './database/controllers/userController';
import { AnswerController } from './database/controllers/answerController';
import { NpsController } from './database/controllers/npsController';

const router = Router();

const user_Controller = new userController();
const survey_Controller = new surveyController();
const sendMail_Controller = new sendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', user_Controller.create);

router.post('/surveys', survey_Controller.create);
router.get('/surveys', survey_Controller.show);

router.post('/sendMail', sendMail_Controller.execute);

router.get('/answers/:value', answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };