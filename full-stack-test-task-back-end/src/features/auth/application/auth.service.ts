import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAuthService } from '../domain/auth.service.interface';
import type { IUserRepository } from '../../users/domain/user.repository.interface';
import { IUserRepositoryToken } from '../../users/domain/user.repository.interface';
import { User } from '../../users/domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,private readonly jwtService: JwtService,
  ) {}

  async register(email: string, name: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(
      Date.now().toString(),
      email,
      name,
      hashedPassword,
      new Date(),
      new Date(),
    );
    return this.userRepository.create(newUser);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    const passwordMatches = await bcrypt.compare(password.trim(), user.password);
    if (!passwordMatches) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
