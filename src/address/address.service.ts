import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { AddressRepository } from '../database/repository/address.repository';
import { AddressEntity } from '../database/entity/address.entity';
import { UserRepository } from '../database/repository/user.repository';
import { CreateAddressRequestDto } from './dto/create-address-request.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getAddress(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.getAddress(id);
    console.log(address.user);
    return address;
  }
  async getAllAddresses(): Promise<AddressEntity[]> {
    return await this.addressRepository.getAllAddresses();
  }
  async createAddress(address: CreateAddressRequestDto): Promise<InsertResult> {
    const addressEntity = new AddressEntity();
    addressEntity.user = await this.userRepository.getUser(address.userId);
    addressEntity.country = address.country;
    addressEntity.city = address.city;
    addressEntity.district = address.district;
    addressEntity.neighbourhood = address.neighbourhood;
    addressEntity.street = address.street;
    addressEntity.apartment = address.apartment;
    addressEntity.buildingNo = address.buildingNo;
    addressEntity.floor = address.floor;
    addressEntity.doorNo = address.doorNo;
    addressEntity.zipcode = address.zipcode;
    return await this.addressRepository.createAddress(addressEntity);
  }
  deactivateAddress(id: number): Promise<UpdateResult> {
    return this.addressRepository.deactivateAddress(id);
  }
  async deleteAddress(id: number): Promise<DeleteResult> {
    return this.addressRepository.deleteAddress(id);
  }
}
