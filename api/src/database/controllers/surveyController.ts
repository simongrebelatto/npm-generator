import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { surveyRepositoryClass } from '../repositories/surveyRepository';

class surveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;
        const surveyRepository = getCustomRepository(surveyRepositoryClass);

        const survey = surveyRepository.create({
            title,
            description
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveyRepository = getCustomRepository(surveyRepositoryClass);
        const all = await surveyRepository.find();

        return response.json(all);
    }
}
export { surveyController };