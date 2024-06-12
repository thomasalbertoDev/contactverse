import { User } from '@prisma/client';
import { WebResponse } from '../model/web.model';
import { UserService } from './user.service';
import { AuthDecorator } from '../common/auth.decorator';
import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      status: true,
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);
    return {
      status: true,
      message: 'User logged in successfully',
      data: result,
    };
  }

  @Get('/current')
  @HttpCode(200)
  async get(@AuthDecorator() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(user);
    return {
      status: true,
      message: 'Get user successfully',
      data: result,
    };
  }

  @Patch('/current')
  @HttpCode(200)
  async update(
    @AuthDecorator() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.update(user, request);
    return {
      status: true,
      message: 'Update user successfully',
      data: result,
    };
  }
}
