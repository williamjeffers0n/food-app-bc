import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersProviders } from './orders.providers';
import { DatabaseModule } from '../../database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...ordersProviders,
    OrdersService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
