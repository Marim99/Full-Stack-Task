import { User } from '../../users/domain/user.entity';

export interface IUserService {
  findById(id: string): Promise<User>;
}
