import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepositoryToken } from '../../users/domain/user.repository.interface';
import { User } from '../../users/domain/user.entity';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      getById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserRepositoryToken, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user if found', async () => {
    const mockUser = new User(
      '1',
      'john@example.com',
      'John Doe',
      'hashedpassword',
      new Date(),
      new Date(),
    );
    userRepositoryMock.getById.mockResolvedValue(mockUser);

    const result = await service.findById('1');
    expect(result).toEqual(mockUser);
    expect(userRepositoryMock.getById).toHaveBeenCalledWith('1');
  });

  it('should throw HttpException if user not found', async () => {
    userRepositoryMock.getById.mockResolvedValue(null);

    await expect(service.findById('2')).rejects.toThrow(HttpException);
    expect(userRepositoryMock.getById).toHaveBeenCalledWith('2');
  });
});
