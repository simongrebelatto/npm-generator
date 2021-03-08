import { EntityRepository, Repository } from 'typeorm';
import { userModel } from '../models/user';

@EntityRepository(userModel)
class usersRepositoryClass extends Repository<userModel> {}

export { usersRepositoryClass };