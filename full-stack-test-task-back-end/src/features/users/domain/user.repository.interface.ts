import { User } from './user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
}
export const IUserRepositoryToken = Symbol('IUserRepository');
