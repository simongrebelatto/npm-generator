import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { usersRepositoryClass } from '../repositories/userRepository';
import * as yup from 'yup';
import { AppError } from '../../errors/AppError';

class userController {

    async create(request: Request, response: Response) {
        const { name, mail } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }
        
        const usersRepository = getCustomRepository(usersRepositoryClass);

        const userAlreadyExists = await usersRepository.findOne({
            mail
        })
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const user = usersRepository.create({
            name, mail
        })

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

}

export { userController };