import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult } from 'typeorm';
import { OrderRepository } from '../database/repository/order.repository';
import { OrderEntity } from '../database/entity/order.entity';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { AddressRepository } from '../database/repository/address.repository';
import { SubscriptionRepository } from '../database/repository/subscription.repository';
import { UserRepository } from '../database/repository/user.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getOrder(id: number): Promise<OrderEntity> {
    return await this.orderRepository.getOrder(id);
  }
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.getAllOrders();
  }
  async createOrder(order: CreateOrderRequestDto): Promise<InsertResult> {
    const orderEntity = new OrderEntity();
    orderEntity.user = await this.userRepository.getUser(order.userId);
    orderEntity.address = await this.addressRepository.getAddress(
      order.addressId,
    );
    orderEntity.subscription =
      await this.subscriptionRepository.getSubscription(order.subscriptionId);
    return this.orderRepository.createOrder(orderEntity);
  }
  async deleteOrder(id: number): Promise<DeleteResult> {
    return this.orderRepository.deleteOrder(id);
  }
}
