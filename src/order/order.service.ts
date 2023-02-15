import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prisma.orders.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: id,
      },
    });

    return order;
  }

  async getOrdersByUserID(user_id: number) {
    const orders = await this.prisma.orders.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        order_time: 'asc',
      },
    });

    return orders;
  }

  async createOrder(body: CreateOrderDto) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: body.product_id,
      },
    });
    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (product.in_stock === 0) {
      throw new HttpException(
        { error_message: 'Product not in stock' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.prisma.orders.create({
      data: {
        phone_number: body.phone_number,
        address: body.address,
        user_id: body.user_id,
        order_time: body.order_time,
        product_id: body.product_id,
        total: product.price,
      },
    });
    if (!order) {
      throw new HttpException(
        { error_message: 'Order not created' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.prisma.products.update({
      where: {
        id: body.product_id,
      },
      data: {
        in_stock: product.in_stock - 1,
      },
    });

    return order;
  }

  async deleteOrder(id: number) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: id,
      },
    });

    await this.prisma.orders
      .delete({
        where: {
          id: id,
        },
      })
      .catch((err) => {
        throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
      });

    const product = await this.prisma.products.findUnique({
      where: {
        id: order.product_id,
      },
    });

    await this.prisma.products.update({
      where: { id: product.id },
      data: {
        in_stock: product.in_stock + 1,
      },
    });

    return { message: 'Delete order success' };
  }
}
