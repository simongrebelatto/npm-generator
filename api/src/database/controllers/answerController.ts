import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/AppError";
import { surveyUserRepositoryClass } from "../repositories/surveyUserRepository";


class AnswerController {

  // http://localhost:3333/answers/3?u=4cb7c3f9-6ba7-415e-bf76-532b625667ac
  // Route Params -> Parâmetros que compõe a rota /answers/1
  // Query Params -> Parâmetros não obrigatórios (busca, paginação)
  // /?chave=valor

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUserRepositoryClass = getCustomRepository(surveyUserRepositoryClass);

    const surveyUser = await surveysUserRepositoryClass.findOne({ id: String(u) })
    
    if (!surveyUser) {
      throw new AppError("Survey does not exists");
    }

    surveyUser.value = Number(value);

    await surveysUserRepositoryClass.save(surveyUser);

    return response.json(surveyUser);
  
  }

}

export { AnswerController };