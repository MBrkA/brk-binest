import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async createUser(user: Partial<UserEntity>): Promise<InsertResult> {
    return await this.userRepository.insert(user);
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: userId });
  }

  async deactivateUser(userId: number): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.active = false;
    return await this.userRepository.update(userId, user);
  }
}
