import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { AddressEntity } from '../entity/address.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async getAddress(addressId: number): Promise<AddressEntity> {
    return await this.addressRepository.findOne({
      where: { id: addressId },
    });
  }
  async getAllAddresses(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }

  async getActiveAddressOfAUser(user: UserEntity): Promise<AddressEntity> {
    return await this.addressRepository.findOne({
      where: { user: user, active: true },
    });
  }
  async createAddress(address: Partial<AddressEntity>): Promise<InsertResult> {
    return await this.addressRepository.insert(address);
  }

  async deleteAddress(addressId: number): Promise<DeleteResult> {
    return await this.addressRepository.delete({ id: addressId });
  }

  async deactivateAddress(addressId: number): Promise<UpdateResult> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
    });
    address.active = false;
    return await this.addressRepository.update(addressId, address);
  }
}
