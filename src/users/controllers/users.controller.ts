import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Patch, Post, Body, Query, Put, Delete } from '@nestjs/common';

import { UsersService } from '../services';
import { PatchUserDto, CreateUserDto, UsersListResponseInterface, UserResponseInterface } from '../types';

@Controller('data/:sessionId/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getUsers(@Res() res, @Param() params, @Query() query): Promise<UsersListResponseInterface> {
    const usersResult = this.usersService.getUsers(params.sessionId, query.skip, query.count);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Get(':userId')
  async getUser(@Res() res, @Param() params): Promise<UserResponseInterface> {
    const usersResult = this.usersService.getUser(params.sessionId, params.userId);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Patch(':userId')
  async patchUser(@Res() res, @Param() params, @Body() patchUserDto: PatchUserDto): Promise<UserResponseInterface> {
    const usersResult = this.usersService.patchUser(params.sessionId, params.userId, patchUserDto);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Post('')
  async addUser(@Res() res, @Param() params, @Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const usersResult = this.usersService.addUser(params.sessionId, createUserDto);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Delete(':userId')
  async removeUser(@Res() res, @Param() params): Promise<UserResponseInterface> {
    const usersResult = this.usersService.removeUser(params.sessionId, params.userId);
    return res.status(HttpStatus.OK).json(usersResult);
  }
}
