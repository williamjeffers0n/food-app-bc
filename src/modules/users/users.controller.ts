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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthenticationHelper } from '../../helpers/authentication.helper';
import {Op} from 'sequelize';
import { UidHelper } from 'src/helpers/uid.helper';
import { AuthenticationException } from 'src/exceptions/authentication.exceptions';

@UseGuards(JwtAuthGuard)
@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    if (createUserDto.phone && createUserDto.phoneExt) {
          let existingPhone = await this.usersService.findOneUser({
              phoneExt: createUserDto.phoneExt, phone: createUserDto.phone
          });
          if (existingPhone) {
              throw new AuthenticationException().PhoneAlreadyExist(1);
          }
      }
    if (createUserDto.email) {
      let existingEmail = await this.usersService.findOneUser({
        email: createUserDto.email,
      });
      if (existingEmail) {
        throw new AuthenticationException().EmailAlreadyExist(1);
      }
    }
    const randomId = UidHelper.generate();
    if (createUserDto.password) {
      const hashedPassword = AuthenticationHelper.hashPassword(
        createUserDto.password,
      );
      createUserDto.passwordSalt = hashedPassword.salt;
      createUserDto.passwordHash = hashedPassword.hash;
      delete createUserDto.password;
    }
    return this.usersService.createUser({...createUserDto, uid: randomId});
  }

  @Get()
  async findAll(
    @Query('page', PaginationPipe) pagination,
    @Query('status') status: string,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortValue') sortValue: string,
    @Query('uid') uid: string,
    @Query('phone') phone: string,
  ) {
    let query: any = {};
    let roleQuery: any;


    let sortObj: any = [['id', 'ASC']];

    if (sortBy && sortValue) {
      sortObj = [[sortBy, sortValue]];
    }

    if (search) {
          query = {
          [Op.or]: [{
            fullName: { [Op.like]: `%${search}%` },
            email: { [Op.like]: `%${search}%` },
            phone: { [Op.like]: `%${search}%` },
          }],
      };
    }

    if (status) {
      query.status = status;
    } 
    if (uid) {
      query.uid = uid;
    } 
    if(phone) {
      query.phone = phone;
    }

    const response = await this.usersService.listAllUsers(
      query,
      pagination.offset,
      pagination.limit,
      sortObj,
    );

    const rows = response.rows.map((user) => {
      let userResponse = user;
      delete userResponse.passwordHash;
      delete userResponse.passwordSalt;
      return userResponse;
    });
    return {
      rows,
      count: response.count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneUser({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.password) {
      const hashedPassword = AuthenticationHelper.hashPassword(
        updateUserDto.password,
      );
      updateUserDto.passwordSalt = hashedPassword.salt;
      updateUserDto.passwordHash = hashedPassword.hash;
      delete updateUserDto.password;
    }
    await this.usersService.updateUser(id, updateUserDto);

    return this.usersService.findOneUser({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
