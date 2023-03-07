import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { AddressController } from './address.controller';
import { DeleteAddressRequestDto } from './dto/delete-address-request.dto';
import { AddressService } from './address.service';
import { AddressRepository } from '../database/repository/address.repository';
import { AddressEntity } from '../database/entity/address.entity';
import { DeactivateAddressRequestDto } from './dto/deactivate-address-request.dto';
import { CreateAddressRequestDto } from './dto/create-address-request.dto';
import { UserRepository } from '../database/repository/user.repository';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
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
        {
          provide: AddressRepository,
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

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  describe('address', () => {
    // GIVEN
    const address: AddressEntity = {
      id: 1,
      user: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      country: 'United States',
      city: 'New York',
      district: null,
      neighbourhood: 'Brooklyn',
      street: 'Main Street',
      apartment: null,
      buildingNo: 123,
      floor: null,
      doorNo: 4,
      zipcode: '12345',
      active: true,
      createdAt: new Date(),
    };
    it('should return expected address from service', async () => {
      // WHEN
      jest
        .spyOn(addressService, 'getAddress')
        .mockImplementation(() => new Promise((resolve) => resolve(address)));
      const result = await controller.getAddress(4);
      // THEN
      expect(result).toEqual(address);
    });
    it('should return all addresses from service', async () => {
      // WHEN
      jest
        .spyOn(addressService, 'getAllAddresses')
        .mockImplementation(() => new Promise((resolve) => resolve([address])));
      const result = await controller.getAllAddresses();
      // THEN
      expect(result).toEqual([address]);
    });
    it('should send create request to service', async () => {
      // GIVEN
      const createAddressRequestDto: CreateAddressRequestDto = {
        userId: 1,
        country: 'United States',
        city: 'New York',
        district: null,
        neighbourhood: 'Brooklyn',
        street: 'Main Street',
        apartment: null,
        buildingNo: 123,
        floor: null,
        doorNo: 4,
        zipcode: '12345',
      };
      const insertResult: InsertResult = {
        generatedMaps: [],
        identifiers: [],
        raw: undefined,
      };
      // WHEN
      jest
        .spyOn(addressService, 'createAddress')
        .mockImplementation(
          () => new Promise((resolve) => resolve(insertResult)),
        );
      const result = await controller.createAddress(createAddressRequestDto);
      // THEN
      expect(result).toEqual(insertResult);
    });
    it('should deactivate address', async () => {
      // GIVEN
      const updateResult: UpdateResult = { generatedMaps: [], raw: undefined };
      const params: DeactivateAddressRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(addressService, 'deactivateAddress')
        .mockImplementation(
          () => new Promise((resolve) => resolve(updateResult)),
        );
      const result = await controller.deactivateAddress(params);
      // THEN
      expect(result).toEqual(updateResult);
    });
    it('should delete address', async () => {
      // GIVEN
      const deleteResult: DeleteResult = { affected: 0, raw: undefined };
      const params: DeleteAddressRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(addressService, 'deleteAddress')
        .mockImplementation(
          () => new Promise((resolve) => resolve(deleteResult)),
        );
      const result = await controller.deleteAddress(params);
      // THEN
      expect(result).toEqual(deleteResult);
    });
  });
});
