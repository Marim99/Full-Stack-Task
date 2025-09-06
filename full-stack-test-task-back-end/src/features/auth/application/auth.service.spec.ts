import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IUserRepositoryToken } from '../../users/domain/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/domain/user.entity';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedpassword'),
  compare: jest.fn(),
}));
describe('AuthService', () => {
  let service: AuthService;
  let userRepositoryMock: any;
  let jwtServiceMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      getByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtServiceMock = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: IUserRepositoryToken, useValue: userRepositoryMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw if email already exists', async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(
        new User(
          '1',
          'test@example.com',
          'John',
          'pass',
          new Date(),
          new Date(),
        ),
      );

      await expect(
        service.register('test@example.com', 'John', 'pass'),
      ).rejects.toThrow(HttpException);
    });

    it('should create a new user if email is not taken', async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(null);
      userRepositoryMock.create.mockImplementation(async (user) => user);

      const result = await service.register(
        'new@example.com',
        'John',
        'pass123',
      );

      expect(result).toBeInstanceOf(User);
      expect(result.email).toBe('new@example.com');
      expect(result.name).toBe('John');
    });
  });

  describe('login', () => {
    const mockUser = new User(
      '1',
      'john@example.com',
      'John',
      'hashedpass',
      new Date(),
      new Date(),
    );

    it('should throw if user does not exist', async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(null);

      await expect(
        service.login('unknown@example.com', 'pass'),
      ).rejects.toThrow(HttpException);
    });

    it('should throw if password is wrong', async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login('john@example.com', 'wrongpass'),
      ).rejects.toThrow(HttpException);
    });

    it('should return token if login is successful', async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login('john@example.com', 'correctpass');

      expect(result).toHaveProperty('token', 'mocked-jwt-token');
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        sub: '1',
        email: 'john@example.com',
      });
    });
  });
});
