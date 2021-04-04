import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository
      .findOne(user_id, {
        relations: ['games']
      }) as User
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('select * from users order by first_name');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query('SELECT * FROM "users" WHERE (lower("first_name") = lower($1)) AND (lower("last_name") = lower($2))', [first_name, last_name]);
  }
}
