import { Injectable, HttpException, HttpStatus, Inject,Logger } from '@nestjs/common';
import { IUserService } from '../domain/user.service.interface';
import type { IUserRepository } from '../../users/domain/user.repository.interface';
import { IUserRepositoryToken } from '../../users/domain/user.repository.interface';
import { User } from '../../users/domain/user.entity';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  async findById(id: string): Promise<User > {
      const user = await this.userRepository.getById(id);
      if (!user) {
        this.logger.warn(`User not found with id: ${id}`); 
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
  }

}
