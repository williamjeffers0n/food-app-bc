import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {Op} from 'sequelize';

@UseGuards(JwtAuthGuard)
@Controller('orders')
@UseInterceptors(TransformResponseInterceptor)
export class OrdersController {
  constructor(
    private ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async findAll(
    @Query('page', PaginationPipe) pagination,
    @Query('status') status: string,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortValue') sortValue: string
  ) {
    let query: any = {};


    let sortObj: any = [['id', 'ASC']];

    if (sortBy && sortValue) {
      sortObj = [[sortBy, sortValue]];
    }

    if (search) {
          query = {
          [Op.or]: [{
            id: { [Op.like]: `%${search}%` },
          }],
      };
    }

    const response = await this.ordersService.listAllOrders(
      query,
      pagination.offset,
      pagination.limit,
      sortObj,
    );
 
    return {
      rows: response.rows,
      count: response.count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOneOrder({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateOrderDto: UpdateOrderDto,
  ) {
    await this.ordersService.updateOrder(id, updateOrderDto);

    return this.ordersService.findOneOrder({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}
