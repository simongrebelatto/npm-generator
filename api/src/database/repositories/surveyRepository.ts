import { EntityRepository, Repository } from 'typeorm';
import { surveyModel } from '../models/survey';

@EntityRepository(surveyModel)
class surveyRepositoryClass extends Repository<surveyModel> {}

export { surveyRepositoryClass };