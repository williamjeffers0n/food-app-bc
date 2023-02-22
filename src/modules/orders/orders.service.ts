import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: typeof Order,
  ) {
  }

  createOrder = async (createOrdersDto: CreateOrderDto) => {
    const order = await this.ordersRepository.create(createOrdersDto, { include: {
      model: OrderItem
    }});
    const currentOrder = await this.findOneOrder({ id: order.id });
    return currentOrder;
  }

  findOrder = async (query: any, select?: any, order?: any) => {
    return this.ordersRepository.findAll({
      where: query,
      attributes: select,
      order,
    });
  }

  findOneOrder = async (query: any) => {
    return this.ordersRepository.findOne({
      where: query,
      include: [{
        association: 'items',
        through: {
          attributes: ['pricePerItem', 'totalItemAmount', 'noOfItem'],
        },
      }]
    });
  }

  listAllOrders = async (query: any,   offset, limit, sort) => {
    return this.ordersRepository.findAndCountAll({
      where: query, offset, limit, order: sort,
      include: [{
        association: 'orderItems',
        include: [{
          association: 'item',
        }]
      }]
    });
  }

  updateOrder = async (id: number, updateOrdersDto: UpdateOrderDto) => {
    return this.ordersRepository.update({ ...updateOrdersDto }, { where: { id } });
  }
  removeOrder = async (id: number) => {
    return this.ordersRepository.destroy({ where: { id } });
  }
}
