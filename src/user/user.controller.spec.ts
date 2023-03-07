import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '../database/entity/user.entity';
import { UserRepository } from '../database/repository/user.repository';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { DeactivateUserRequestDto } from './dto/deactivate-user-request.dto';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('user', () => {
    // GIVEN
    const user: UserEntity = {
      id: 4,
      username: 'john_doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: null,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should return expected user from service', async () => {
      // WHEN
      jest
        .spyOn(userService, 'getUser')
        .mockImplementation(() => new Promise((resolve) => resolve(user)));
      const result = await controller.getUser(4);
      // THEN
      expect(result).toEqual(user);
    });
    it('should return all users from service', async () => {
      // WHEN
      jest
        .spyOn(userService, 'getAllUsers')
        .mockImplementation(() => new Promise((resolve) => resolve([user])));
      const result = await controller.getAllUsers();
      // THEN
      expect(result).toEqual([user]);
    });
    it('should send create request to service', async () => {
      // GIVEN
      const insertResult: InsertResult = {
        generatedMaps: [],
        identifiers: [],
        raw: undefined,
      };
      // WHEN
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(
          () => new Promise((resolve) => resolve(insertResult)),
        );
      const result = await controller.createUser(user);
      // THEN
      expect(result).toEqual(insertResult);
    });
    it('should deactivate user', async () => {
      // GIVEN
      const updateResult: UpdateResult = { generatedMaps: [], raw: undefined };
      const params: DeactivateUserRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(userService, 'deactivateUser')
        .mockImplementation(
          () => new Promise((resolve) => resolve(updateResult)),
        );
      const result = await controller.deactivateUser(params);
      // THEN
      expect(result).toEqual(updateResult);
    });
    it('should delete user', async () => {
      // GIVEN
      const deleteResult: DeleteResult = { affected: 0, raw: undefined };
      const params: DeleteUserRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementation(
          () => new Promise((resolve) => resolve(deleteResult)),
        );
      const result = await controller.deleteUser(params);
      // THEN
      expect(result).toEqual(deleteResult);
    });
  });
});
