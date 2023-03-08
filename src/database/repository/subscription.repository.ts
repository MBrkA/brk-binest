import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  InsertResult,
  Raw,
  Repository,
  UpdateResult,
} from 'typeorm';
import { SubscriptionEntity } from '../entity/subscription.entity';
import moment from 'moment';
@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async getSubscription(subscriptionId: number): Promise<SubscriptionEntity> {
    return await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });
  }
  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find();
  }
  async createSubscription(
    subscription: Partial<SubscriptionEntity>,
  ): Promise<InsertResult> {
    return await this.subscriptionRepository.insert(subscription);
  }

  async deleteSubscription(subscriptionId: number): Promise<DeleteResult> {
    return await this.subscriptionRepository.delete({ id: subscriptionId });
  }

  async deactivateSubscription(subscriptionId: number): Promise<UpdateResult> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });
    subscription.active = false;
    subscription.updatedAt = new Date();
    return await this.subscriptionRepository.update(
      subscriptionId,
      subscription,
    );
  }

  async getRenewableSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.findBy({
      nextPaymentAt: Raw((alias) => `${alias} <= :date`, { date: new Date() }),
      active: true,
    });
  }

  async renewSubscription(subscriptionId: number): Promise<UpdateResult> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });
    subscription.nextPaymentAt = moment()
      .add(subscription.frequency, 'month')
      .toDate();
    subscription.paymentTryCount = 0;
    subscription.updatedAt = new Date();
    return await this.subscriptionRepository.update(
      subscriptionId,
      subscription,
    );
  }

  async increaseTryCount(subscriptionId: number): Promise<UpdateResult> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });
    subscription.paymentTryCount += 1;
    subscription.updatedAt = new Date();
    if (subscription.paymentTryCount === 3) {
      // SUBSCRIPTION DEACTIVATED AFTER THREE FAILED PAYMENT ATTEMPTS
      // USER CAN BE NOTIFIED BY SENDING EMAIL
      subscription.active = false;
    }
    return await this.subscriptionRepository.update(
      subscriptionId,
      subscription,
    );
  }
}
