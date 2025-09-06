import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "../application/user.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: { findById: jest.Mock };

  beforeEach(async () => {
    userServiceMock = {
      findById: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: () => true,
    })
    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile as UserDto', async () => {
    const mockUser = {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userServiceMock.findById.mockResolvedValue(mockUser);

    const req = { user: { id: '1' } };
    const result = await controller.getProfile(req as any);

    expect(result).toBeDefined();
    expect(result!.id).toBe('1');
    expect(result!.name).toBe('John Doe');
    expect(result!.email).toBe('john@example.com');
    expect((result as any).password).toBeUndefined();
  });
});
