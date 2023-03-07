import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SubscriptionEntity } from '../entity/subscription.entity';
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
  async createSubscription(subscription: Partial<SubscriptionEntity>) {
    await this.subscriptionRepository.insert(subscription);
  }

  async deleteSubscription(subscriptionId: number) {
    return await this.subscriptionRepository.delete({ id: subscriptionId });
  }

  async deactivateSubscription(subscriptionId: number) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });
    subscription.active = false;
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
}