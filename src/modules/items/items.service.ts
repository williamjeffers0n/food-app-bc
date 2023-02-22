import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEMS_REPOSITORY')
    private itemsRepository: typeof Item,
  ) {
  }

  createItem = async (createItemsDto: CreateItemDto) => {
    const item = await this.itemsRepository.create(createItemsDto)
    const currentItem = await this.findOneItem({ id: item.id });
    return currentItem;
  }

  findItem = async (query: any, select?: any, order?: any) => {
    return this.itemsRepository.findAll({
      where: query,
      attributes: select,
      order,
    });
  }

  findOneItem = async (query: any, restaurantQuery?:any) => {
    return this.itemsRepository.findOne({
      where: query,
      include: [{
        association: 'restaurants',
        where: restaurantQuery,
        through: {
          attributes: ['amount', 'quantity'],
        },
      }]
    });
  }

  listAllItems = async (query: any,   offset, limit, sort) => {
    return this.itemsRepository.findAndCountAll({
      where: query, offset, limit, order: sort
    });
  }

  updateItem = async (id: number, updateItemsDto: UpdateItemDto) => {
    return this.itemsRepository.update({ ...updateItemsDto }, { where: { id } });
  }
  removeItem = async (id: number) => {
    return this.itemsRepository.destroy({ where: { id } });
  }
}
