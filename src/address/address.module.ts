import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService, ConfigService],
})
export class AddressModule {}
