import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { SubscriptionRepository } from '../database/repository/subscription.repository';
import { SubscriptionEntity } from '../database/entity/subscription.entity';
import { CreateSubscriptionRequestDto } from './dto/create-subscription-request.dto';
import { UserRepository } from '../database/repository/user.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository,
  ) {}
  getSubscription(id: number): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.getSubscription(id);
  }
  getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepository.getAllSubscriptions();
  }
  async createSubscription(
    subscription: CreateSubscriptionRequestDto,
  ): Promise<InsertResult> {
    /*
      TODO:dates
     */
    const subscriptionEntity = new SubscriptionEntity();
    subscriptionEntity.user = await this.userRepository.getUser(
      subscription.userId,
    );
    subscriptionEntity.currency = subscription.currency;
    subscriptionEntity.amount = subscription.amount;
    subscriptionEntity.frequency = subscription.frequency;
    subscriptionEntity.nextPaymentAt = new Date();
    subscriptionEntity.stripeCardId = subscription.stripeCardId;
    return this.subscriptionRepository.createSubscription(subscriptionEntity);
  }
  deactivateSubscription(id: number): Promise<UpdateResult> {
    return this.subscriptionRepository.deactivateSubscription(id);
  }
  deleteSubscription(id: number): Promise<DeleteResult> {
    return this.subscriptionRepository.deleteSubscription(id);
  }
}
