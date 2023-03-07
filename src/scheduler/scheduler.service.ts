import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { SubscriptionRepository } from '../database/repository/subscription.repository';
import { CreateOrderHelper } from './helpers/create-order.helper';

@Injectable()
export class TasksService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly createOrderHelper: CreateOrderHelper,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const subsToRenew =
      await this.subscriptionRepository.getRenewableSubscriptions();

    for (const subscription of subsToRenew) {
      if (subscription.active && subscription.paymentTryCount < 3) {
        await this.createOrderHelper.createOrder(subscription);
      }
    }
  }
}
