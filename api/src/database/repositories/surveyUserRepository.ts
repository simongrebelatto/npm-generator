import { Entity, EntityRepository, Repository } from 'typeorm';
import { surveysUserModel } from '../models/surveyUser';

@EntityRepository(surveysUserModel)
class surveyUserRepositoryClass extends Repository<surveysUserModel> {}

export { surveyUserRepositoryClass };