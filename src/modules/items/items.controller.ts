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
import { ItemsService } from './items.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {Op} from 'sequelize';
import { JwtAuthAllowEmptyTokenGuard } from 'src/guards/jwt-auth-allow-empty-token.guard';

@Controller('items')
@UseInterceptors(TransformResponseInterceptor)
export class ItemsController {
  constructor(
    private itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)  
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  @UseGuards(JwtAuthAllowEmptyTokenGuard)
  @Get()
  async findAll(
    @Query('page', PaginationPipe) pagination,
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
            name: { [Op.like]: `%${search}%` },
          }],
      };
    }

    const response = await this.itemsService.listAllItems(
      query,
      pagination.offset,
      pagination.limit,
      sortObj,
    );
    return {
      rows : response.rows,
      count: response.count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('restaurantId') restaurantId: number,) {
    let restaurantQuery: any;
    if (restaurantId) {
      restaurantQuery = {};
      restaurantQuery.id = restaurantId;
    }
    return this.itemsService.findOneItem({ id}, restaurantQuery);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateItemDto: UpdateItemDto,
  ) {
    await this.itemsService.updateItem(id, updateItemDto);

    return this.itemsService.findOneItem({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemsService.removeItem(id);
  }
}
