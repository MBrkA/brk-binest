import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TasksService } from './scheduler.service';
import { CreateOrderHelper } from './helpers/create-order.helper';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [DatabaseModule, StripeModule],
  providers: [TasksService, CreateOrderHelper],
  exports: [TasksService],
})
export class SchedulerModule {}
