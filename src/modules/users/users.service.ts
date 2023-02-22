import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {
  }

  createUser = async (createUsersDto: CreateUserDto) => {
    const user = await this.usersRepository.create(createUsersDto)
    const currentUser = await this.findOneUser({ id: user.id });
    if (currentUser) {
      return currentUser
    }
    return user;
  }

  findUser = async (query: any, select?: any, order?: any) => {
    return this.usersRepository.findAll({
      where: query,
      attributes: select,
      order,
    });
  }

  findOneUser = async (query: any) => {
    return this.usersRepository.findOne({
      where: query,
      attributes: { exclude: ['passwordHash', 'passwordSalt', 'deletedAt'] }
    });
  }

  listAllUsers = async (query: any,   offset, limit, sort) => {
    return this.usersRepository.findAndCountAll({
      where: query, offset, limit, order: sort,
      attributes: { exclude: ['passwordHash', 'passwordSalt', 'deletedAt'] }
    });
  }

  updateUser = async (id: number, updateUsersDto: UpdateUserDto) => {
    return this.usersRepository.update({ ...updateUsersDto }, { where: { id } });
  }
  removeUser = async (id: number) => {
    return this.usersRepository.destroy({ where: { id } });
  }
}
