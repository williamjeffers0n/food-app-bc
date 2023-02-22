import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../../database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...usersProviders,
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
