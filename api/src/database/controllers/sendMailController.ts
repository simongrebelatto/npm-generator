import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import sendMailServices from '../../services/sendMailServices';
import { surveyRepositoryClass } from '../repositories/surveyRepository';
import { surveyUserRepositoryClass } from '../repositories/surveyUserRepository';
import { usersRepositoryClass } from '../repositories/userRepository';
import { resolve} from 'path';

class sendMailController {

  async execute(request: Request, response: Response) {
    const { mail, survey_id } = request.body;
    
    const userRepository = getCustomRepository(usersRepositoryClass);
    const surveyRepository = getCustomRepository(surveyRepositoryClass);
    const surveyUserRepository = getCustomRepository(surveyUserRepositoryClass);

    const user = await userRepository.findOne({mail});
    if(!user) {
      return response.status(400).json({
        error: 'user doesnt exists'
      });
    }

    const survey =  await surveyRepository.findOne({id: survey_id})

    if(!survey) {
      return response.status(400).json({
        error: 'survey doesnt exists'
      });
    }

    // Verifing surveyUser
    const npsPath = resolve(__dirname, '..', '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: {user_id: user.id, value: null},
      relations: ['user', 'survey']
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await sendMailServices.execute(mail, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    // Creating surveyUserController
    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    });
    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await sendMailServices.execute(mail, survey.title, variables, npsPath);

    return response.json({surveyUser});
  }
}

export { sendMailController };