import { User } from '../../users/domain/user.entity';

export interface IAuthService {
  register(email: string, name: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{ token: string }>;
}
