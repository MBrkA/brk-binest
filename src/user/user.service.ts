import { Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entity/user.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserRepository } from '../database/repository/user.repository';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.getUser(id);
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUsers();
  }
  async createUser(user: CreateUserRequestDto): Promise<InsertResult> {
    const userEntity = new UserEntity();
    userEntity.username = user.username;
    userEntity.email = user.email;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.phone = user.phone;
    return await this.userRepository.createUser(userEntity);
  }
  deactivateUser(id: number): Promise<UpdateResult> {
    return this.userRepository.deactivateUser(id);
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.deleteUser(id);
  }
}
