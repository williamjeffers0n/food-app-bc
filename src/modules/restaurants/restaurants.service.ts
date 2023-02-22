import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { Association } from 'sequelize/types';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject('RESTAURENTS_REPOSITORY')
    private restaurantsRepository: typeof Restaurant,
  ) {
  }

  createRestaurant = async (createRestaurantsDto: CreateRestaurantDto) => {
    const restaurant = await this.restaurantsRepository.create(createRestaurantsDto)
    const currentRestaurant = await this.findOneRestaurant({ id: restaurant.id });
    return currentRestaurant;
  }

  findRestaurant = async (query: any, select?: any, order?: any) => {
    return this.restaurantsRepository.findAll({
      where: query,
      attributes: select,
      order,
    });
  }

  findOneRestaurant = async (query: any, itemQuery?:any) => {
    return this.restaurantsRepository.findOne({
      where: query,
      include: [{
        association: 'items',
        where: itemQuery,
        through: {
          as:'restaurantItems',
          attributes: ['amount', 'quantity'],
        },
      }]
    });
  }

  listAllRestaurants = async (query: any,   offset, limit, sort) => {
    return this.restaurantsRepository.findAndCountAll({
      where: query, offset, limit, order: sort
    });
  }

  updateRestaurant = async (id: number, updateRestaurantsDto: UpdateRestaurantDto) => {
    return this.restaurantsRepository.update({ ...updateRestaurantsDto }, { where: { id } });
  }
  removeRestaurant = async (id: number) => {
    return this.restaurantsRepository.destroy({ where: { id } });
  }
}
