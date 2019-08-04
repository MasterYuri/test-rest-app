import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Patch, Post, Body, Query, Put, Delete } from '@nestjs/common';

import { AppService } from './app.service';
import { PatchUserDto, CreateUserDto, UsersListResponseInterface, UserResponseInterface } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data/:sessionId/users')
  async getUsers(@Res() res, @Param() params, @Query() query): Promise<UsersListResponseInterface> {
    const usersResult = this.appService.getUsers(params.sessionId, query.skip, query.count);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Get('data/:sessionId/users/:userId')
  async getUser(@Res() res, @Param() params): Promise<UserResponseInterface> {
    const usersResult = this.appService.getUser(params.sessionId, params.userId);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Patch('data/:sessionId/users/:userId')
  async patchUser(@Res() res, @Param() params, @Body() patchUserDto: PatchUserDto): Promise<UserResponseInterface> {
    const usersResult = this.appService.patchUser(params.sessionId, params.userId, patchUserDto);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Post('data/:sessionId/users')
  async addUser(@Res() res, @Param() params, @Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const usersResult = this.appService.addUser(params.sessionId, createUserDto);
    return res.status(HttpStatus.OK).json(usersResult);
  }

  @Delete('data/:sessionId/users/:userId')
  async removeUser(@Res() res, @Param() params): Promise<UserResponseInterface> {
    const usersResult = this.appService.removeUser(params.sessionId, params.userId);
    return res.status(HttpStatus.OK).json(usersResult);
  }
}
