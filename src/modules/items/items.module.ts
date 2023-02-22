import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { itemsProviders } from './items.providers';
import { DatabaseModule } from '../../database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemsProviders,
    ItemsService,
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
