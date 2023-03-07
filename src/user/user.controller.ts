import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserEntity } from '../database/entity/user.entity';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';
import { DeactivateUserRequestDto } from './dto/deactivate-user-request.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get/:id')
  getUser(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getUser(id);
  }
  @Get('getall')
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<InsertResult> {
    return await this.userService.createUser(createUserDto);
  }
  @Post('deactivate')
  deactivateUser(
    @Body() deactivateUserDto: DeactivateUserRequestDto,
  ): Promise<UpdateResult> {
    return this.userService.deactivateUser(deactivateUserDto.id);
  }
  @Post('delete')
  deleteUser(
    @Body() deleteUserDto: DeleteUserRequestDto,
  ): Promise<DeleteResult> {
    return this.userService.deleteUser(deleteUserDto.id);
  }
}
