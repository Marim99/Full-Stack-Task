import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../domain/user.entity';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockModel: any;

  const mockFoundUser = {
    _id: { toString: () => '1' },
    email: 'john@example.com',
    name: 'John Doe',
    password: 'hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockModel = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: getModelToken(User.name), useValue: mockModel },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getByEmail', () => {
    it('should return user if found', async () => {
      mockModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFoundUser),
      });

      const result = await repository.getByEmail('john@example.com');

      expect(result).toBeInstanceOf(User);
      expect(result?.email).toBe('john@example.com');
    });

    it('should return null if not found', async () => {
      mockModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await repository.getByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return user if found', async () => {
      mockModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFoundUser),
      });

      const result = await repository.getById('1');

      expect(result).toBeInstanceOf(User);
      expect(result?.id).toBe('1');
    });

    it('should return null if not found', async () => {
      mockModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await repository.getById('2');

      expect(result).toBeNull();
    });
  });
});
