import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { DeleteSubscriptionRequestDto } from './dto/delete-subscription-request.dto';
import { DeactivateSubscriptionRequestDto } from './dto/deactivate-subscription-request.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { SubscriptionEntity } from '../database/entity/subscription.entity';
import { CreateSubscriptionRequestDto } from './dto/create-subscription-request.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('get/:id')
  getSubscription(@Param('id') id: number) {
    return this.subscriptionService.getSubscription(id);
  }
  @Get('getall')
  getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getAllSubscriptions();
  }
  @Post('create')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionRequestDto,
  ): Promise<InsertResult> {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
  @Post('deactivate')
  deactivateSubscription(
    @Body() deactivateSubscriptionDto: DeactivateSubscriptionRequestDto,
  ): Promise<UpdateResult> {
    return this.subscriptionService.deactivateSubscription(
      deactivateSubscriptionDto.id,
    );
  }
  @Post('delete')
  deleteSubscription(
    @Body() deleteSubscriptionDto: DeleteSubscriptionRequestDto,
  ): Promise<DeleteResult> {
    return this.subscriptionService.deleteSubscription(
      deleteSubscriptionDto.id,
    );
  }
}
