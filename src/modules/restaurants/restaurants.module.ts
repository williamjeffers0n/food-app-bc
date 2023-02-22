import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { restaurantsProviders } from './restaurants.providers';
import { DatabaseModule } from '../../database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...restaurantsProviders,
    RestaurantsService,
  ],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
