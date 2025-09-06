import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call AuthService.register and return user', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        name: 'John',
        password: 'pass123',
      };
      const mockUser = { id: '1', email: dto.email, name: dto.name };
      authServiceMock.register.mockResolvedValue(mockUser);

      const result = await controller.register(dto);

      expect(authServiceMock.register).toHaveBeenCalledWith(
        dto.email,
        dto.name,
        dto.password,
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw if AuthService.register throws', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        name: 'John',
        password: 'pass123',
      };
      authServiceMock.register.mockRejectedValue(
        new HttpException('Email exists', 400),
      );

      await expect(controller.register(dto)).rejects.toThrow(HttpException);
    });
  });

  describe('login', () => {
    it('should call AuthService.login and return token', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'pass123' };
      const mockToken = { token: 'jwt-token' };
      authServiceMock.login.mockResolvedValue(mockToken);

      const result = await controller.login(dto);

      expect(authServiceMock.login).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );
      expect(result).toEqual(mockToken);
    });

    it('should throw if AuthService.login throws', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'pass123' };
      authServiceMock.login.mockRejectedValue(
        new HttpException('Wrong password', 401),
      );

      await expect(controller.login(dto)).rejects.toThrow(HttpException);
    });
  });

  describe('logout', () => {
    it('should return success message', async () => {
      const req = { user: { id: '1' } };
      const result = await controller.logout(req as any);

      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });
});
