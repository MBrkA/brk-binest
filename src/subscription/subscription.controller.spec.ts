import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { SubscriptionController } from './subscription.controller';
import { DeleteSubscriptionRequestDto } from './dto/delete-subscription-request.dto';
import { SubscriptionService } from './subscription.service';
import { SubscriptionRepository } from '../database/repository/subscription.repository';
import { SubscriptionEntity } from '../database/entity/subscription.entity';
import { DeactivateSubscriptionRequestDto } from './dto/deactivate-subscription-request.dto';
import { CreateSubscriptionRequestDto } from './dto/create-subscription-request.dto';
import { UserRepository } from '../database/repository/user.repository';
import { CurrencyType } from '../database/enum/currency.enum';
import { FrequencyType } from '../database/enum/frequency.enum';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        SubscriptionService,
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
          provide: SubscriptionRepository,
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

    controller = module.get<SubscriptionController>(SubscriptionController);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
  });

  describe('subscription', () => {
    // GIVEN
    const subscription: SubscriptionEntity = {
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
      currency: CurrencyType.TRY,
      amount: 99,
      frequency: FrequencyType.MONTHLY,
      nextPaymentAt: new Date(),
      stripeCardId: 1234567890,
      paymentTryCount: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should return expected subscription from service', async () => {
      // WHEN
      jest
        .spyOn(subscriptionService, 'getSubscription')
        .mockImplementation(
          () => new Promise((resolve) => resolve(subscription)),
        );
      const result = await controller.getSubscription(4);
      // THEN
      expect(result).toEqual(subscription);
    });
    it('should return all subscriptions from service', async () => {
      // WHEN
      jest
        .spyOn(subscriptionService, 'getAllSubscriptions')
        .mockImplementation(
          () => new Promise((resolve) => resolve([subscription])),
        );
      const result = await controller.getAllSubscriptions();
      // THEN
      expect(result).toEqual([subscription]);
    });
    it('should send create request to service', async () => {
      // GIVEN
      const createSubscriptionRequestDto: CreateSubscriptionRequestDto = {
        amount: 99,
        currency: CurrencyType.TRY,
        frequency: FrequencyType.MONTHLY,
        stripeCardId: 32423,
        userId: 2,
      };
      const insertResult: InsertResult = {
        generatedMaps: [],
        identifiers: [],
        raw: undefined,
      };
      // WHEN
      jest
        .spyOn(subscriptionService, 'createSubscription')
        .mockImplementation(
          () => new Promise((resolve) => resolve(insertResult)),
        );
      const result = await controller.createSubscription(
        createSubscriptionRequestDto,
      );
      // THEN
      expect(result).toEqual(insertResult);
    });
    it('should deactivate subscription', async () => {
      // GIVEN
      const updateResult: UpdateResult = { generatedMaps: [], raw: undefined };
      const params: DeactivateSubscriptionRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(subscriptionService, 'deactivateSubscription')
        .mockImplementation(
          () => new Promise((resolve) => resolve(updateResult)),
        );
      const result = await controller.deactivateSubscription(params);
      // THEN
      expect(result).toEqual(updateResult);
    });
    it('should delete subscription', async () => {
      // GIVEN
      const deleteResult: DeleteResult = { affected: 0, raw: undefined };
      const params: DeleteSubscriptionRequestDto = { id: 0 };
      // WHEN
      jest
        .spyOn(subscriptionService, 'deleteSubscription')
        .mockImplementation(
          () => new Promise((resolve) => resolve(deleteResult)),
        );
      const result = await controller.deleteSubscription(params);
      // THEN
      expect(result).toEqual(deleteResult);
    });
  });
});
