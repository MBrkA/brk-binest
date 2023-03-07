import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressRequestDto } from './dto/create-address-request.dto';
import { DeleteAddressRequestDto } from './dto/delete-address-request.dto';
import { DeactivateAddressRequestDto } from './dto/deactivate-address-request.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { AddressEntity } from '../database/entity/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('get/:id')
  getAddress(@Param('id') id: number): Promise<AddressEntity> {
    return this.addressService.getAddress(id);
  }
  @Get('getall')
  getAllAddresses(): Promise<AddressEntity[]> {
    return this.addressService.getAllAddresses();
  }
  @Post('create')
  createAddress(
    @Body() createAddressDto: CreateAddressRequestDto,
  ): Promise<InsertResult> {
    return this.addressService.createAddress(createAddressDto);
  }
  @Post('deactivate')
  deactivateAddress(
    @Body() deactivateAddressDto: DeactivateAddressRequestDto,
  ): Promise<UpdateResult> {
    return this.addressService.deactivateAddress(deactivateAddressDto.id);
  }
  @Post('delete')
  deleteAddress(
    @Body() deleteAddressDto: DeleteAddressRequestDto,
  ): Promise<DeleteResult> {
    return this.addressService.deleteAddress(deleteAddressDto.id);
  }
}
