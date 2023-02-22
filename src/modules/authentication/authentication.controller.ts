import {
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { AuthenticationHelper } from 'src/helpers/authentication.helper';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { AuthenticationException } from '../../exceptions/authentication.exceptions';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UidHelper } from 'src/helpers/uid.helper';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @UseInterceptors(TransformResponseInterceptor)
  async loginOrRegister(@Body() userLoginDto: UserLoginDto) {
    let user = null;
    console.log(userLoginDto.email);
    const selectParams = [
      'id',
      'passwordHash',
      'passwordSalt',
      'fullName',
      'email',
      'phoneExt',
      'phone',
      'uid',
      'createdAt',
      'updatedAt',
      'address',
      'username'
    ];

    let users = await this.usersService.findUser(
      { email: userLoginDto.email},
      selectParams,
      [['id', 'ASC']],
    );
    if (users.length === 0) {
      throw new AuthenticationException().UserNotFound(1);
    }

    for (let index = 0; index < users.length; index++) {
      const currentUser = users[index];
      if (currentUser.passwordHash && currentUser.passwordSalt) {
        const isValidPassword = AuthenticationHelper.verifyHash(
          userLoginDto.password,
          currentUser.passwordHash,
          currentUser.passwordSalt,
        );
        if (isValidPassword) {
          user = currentUser;
          break;
        }
      }
    }
    if (users.length > 0 && user === null) {
      throw new AuthenticationException().IncorrectEmailOrPassword(1);
    }
    return this.generateUserToken(user.id);
  }

  @Post('signup')
  @UseInterceptors(TransformResponseInterceptor)
  async signUp(@Body() createUserDTO: CreateUserDto) {
    if (createUserDTO.email) {
      let existingEmail = await this.usersService.findOneUser({
        email: createUserDTO.email,
      });
      if (existingEmail) {
        throw new AuthenticationException().EmailAlreadyExist(1);
      }
    }
    const randomId = UidHelper.generate();
    let newUser: any = {
      username: createUserDTO.username,
      password: createUserDTO.password,
      email: createUserDTO.email,
      fullName: createUserDTO.fullName,
      phone: createUserDTO.phone,
      phoneExt: createUserDTO.phoneExt,
      uid: randomId,
      status: 'Active',
      address: createUserDTO.address,
 
    };
    if (createUserDTO.password) {
      let hashedPassword = AuthenticationHelper.hashPassword(
        createUserDTO.password,
      );
      newUser.passwordSalt = hashedPassword.salt;
      newUser.passwordHash = hashedPassword.hash;
    }
    const createdUser = await this.usersService.createUser(newUser);
    return this.generateUserToken(createdUser.id);
  }

  async generateUserToken(id: number) {
    const currentUser = await this.usersService.findOneUser({ id });
    delete currentUser.passwordHash;
    delete currentUser.passwordSalt;
    delete currentUser.deletedAt;
    const token = this.authenticationService.createToken(
      currentUser.uid);
    return { user: currentUser, token }
  }
}
