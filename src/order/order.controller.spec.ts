import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, InsertResult } from 'typeorm';
import { OrderController } from './order.controller';
import { DeleteOrderRequestDto } from './dto/delete-order-request.dto';
import { OrderService } from './order.service';
import { OrderRepository } from '../database/repository/order.repository';
import { OrderEntity } from '../database/entity/order.entity';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { UserRepository } from '../database/repository/user.repository';
import { CurrencyType } from '../database/enum/currency.enum';
import { FrequencyType } from '../database/enum/frequency.enum';
import { AddressRepository } from '../database/repository/address.repository';
import { SubscriptionRepository } from '../database/repository/subscription.repository';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
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
        {
          provide: SubscriptionRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: OrderRepository,
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

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('order', () => {
    // GIVEN
    const order: OrderEntity = {
      id: 1,
      user: {
        id: 2,
        username: 'johndoe',
        email: 'johndoe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      address: {
        id: 3,
        user: {
          id: 2,
          username: 'johndoe',
          email: 'johndoe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        country: 'USA',
        city: 'New York',
        district: null,
        neighbourhood: 'Manhattan',
        street: 'Broadway',
        apartment: null,
        buildingNo: 100,
        floor: null,
        doorNo: 10,
        zipcode: '10001',
        active: true,
        createdAt: new Date(),
      },
      subscription: {
        id: 4,
        user: {
          id: 2,
          username: 'johndoe',
          email: 'johndoe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        currency: CurrencyType.TRY,
        amount: 50,
        frequency: FrequencyType.MONTHLY,
        nextPaymentAt: new Date(),
        stripeCardId: 123456,
        paymentTryCount: 0,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      isSuccessful: false,
      createdAt: new Date(),
    };
    it('should return expected order from service', async () => {
      // WHEN
      jest
        .spyOn(orderService, 'getOrder')
        .mockImplementation(() => new Promise((resolve) => resolve(order)));
      const result = await controller.getOrder(4);
      // THEN
      expect(result).toEqual(order);
    });
    it('should return all orders from service', async () => {
      // WHEN
      jest
        .spyOn(orderService, 'getAllOrders')
        .mockImplementation(() => new Promise((resolve) => resolve([order])));
      const result = await controller.getAllOrders();
      // THEN
      expect(result).toEqual([order]);
    });
    it('should send create request to service', async () => {
      // GIVEN
      const createOrderRequestDto: CreateOrderRequestDto = {
        addressId: 2,
        subscriptionId: 3,
        userId: 4,
      };
      const insertResult: InsertResult = {
        generatedMaps: [],
        identifiers: [],
        raw: undefined,
      };
      // WHEN
      jest
        .spyOn(orderService, 'createOrder')
        .mockImplementation(
          () => new Promise((resolve) => resolve(insertResult)),
        );
      const result = await controller.createOrder(createOrderRequestDto);
      // THEN
      expect(result).toEqual(insertResult);
    });
    it('should delete order', async () => {
      // GIVEN
      const deleteResult: DeleteResult = { affected: 0, raw: undefined };
      const params: DeleteOrderRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(orderService, 'deleteOrder')
        .mockImplementation(
          () => new Promise((resolve) => resolve(deleteResult)),
        );
      const result = await controller.deleteOrder(params);
      // THEN
      expect(result).toEqual(deleteResult);
    });
  });
});
