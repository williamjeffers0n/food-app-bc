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
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {Op} from 'sequelize';
import { JwtAuthAllowEmptyTokenGuard } from 'src/guards/jwt-auth-allow-empty-token.guard';

@Controller('restaurants')
@UseInterceptors(TransformResponseInterceptor)
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)  
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  @UseGuards(JwtAuthAllowEmptyTokenGuard)
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

    if(status) {
      query.status = status;
    }

    const response = await this.restaurantsService.listAllRestaurants(
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
  findOne(@Param('id') id: number,
  @Query('itemId') itemId: number) {
    let query: any;
    if (itemId) {
      query = {};
      query.id = itemId;
    }
    return this.restaurantsService.findOneRestaurant({ id }, query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateRestaurantDto: UpdateRestaurantDto,
  ) {
    await this.restaurantsService.updateRestaurant(id, updateRestaurantDto);

    return this.restaurantsService.findOneRestaurant({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.restaurantsService.removeRestaurant(id);
  }
}
