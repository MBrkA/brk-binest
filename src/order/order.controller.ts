import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { DeleteOrderRequestDto } from './dto/delete-order-request.dto';
import { DeleteResult, InsertResult } from 'typeorm';
import { OrderEntity } from '../database/entity/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('get/:id')
  getOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.orderService.getOrder(id);
  }
  @Get('getall')
  getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.getAllOrders();
  }
  @Post('create')
  createOrder(
    @Body() createOrderDto: CreateOrderRequestDto,
  ): Promise<InsertResult> {
    return this.orderService.createOrder(createOrderDto);
  }
  @Post('delete')
  deleteOrder(
    @Body() deleteOrderDto: DeleteOrderRequestDto,
  ): Promise<DeleteResult> {
    return this.orderService.deleteOrder(deleteOrderDto.id);
  }
}
