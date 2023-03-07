import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getOrder(orderId: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id: orderId },
    });
  }
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }
  async createOrder(order: Partial<OrderEntity>): Promise<InsertResult> {
    return await this.orderRepository.insert(order);
  }

  async deleteOrder(orderId: number): Promise<DeleteResult> {
    return await this.orderRepository.delete({ id: orderId });
  }
}
