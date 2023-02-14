import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders;
  }

  @Get('/{id}')
  async getOrderById(@Param('id') id: number) {
    return await this.orderService.getOrderById(id);
  }

  @Get('/user/{user_id}')
  async getOrdersByUserID(@Param('user_id') user_id: number) {
    return await this.orderService.getOrdersByUserID(user_id);
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }

  @Delete('/{id}')
  async deleteOrder(@Param('id') id: number) {
    return await this.orderService.deleteOrder(id);
  }
}
