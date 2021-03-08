import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { surveyUserRepositoryClass } from "../repositories/surveyUserRepository";

/**
* Calculo de NPS
* Detratores -> 0 a 6
* Passivos -> 7 e 8
* Promotores -> 9 a 10
*
* (nº de promotores - nº de detratores) / (nº total de respondentes) * 100
*/

class NpsController {

  async execute(request: Request, response: Response) {

    const { survey_id } = request.params 

    const surveyUserRepository = getCustomRepository(surveyUserRepositoryClass);

    const surveysUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveysUsers.filter(survey => survey.value >= 0 && survey.value <= 6).length;
    const promoter = surveysUsers.filter(survey => survey.value >= 9 && survey.value <= 10).length;
    const passive = surveysUsers.filter(survey => survey.value >= 7 && survey.value <= 8).length;
    const totalAnswers = surveysUsers.length;

    const calculate = Number((((promoter - detractor) / totalAnswers )*100).toFixed(2));

    return response.json({
      detractor,
      promoter,
      passive,
      totalAnswers,
      nps: calculate
    });
  }
}

export { NpsController };