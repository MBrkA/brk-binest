import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entity/user.entity';
import { AddressRepository } from './repository/address.repository';
import { AddressEntity } from './entity/address.entity';
import { SubscriptionEntity } from './entity/subscription.entity';
import { SubscriptionRepository } from './repository/subscription.repository';
import { OrderEntity } from './entity/order.entity';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*.js'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      AddressEntity,
      SubscriptionEntity,
      OrderEntity,
    ]),
  ],
  providers: [
    UserRepository,
    AddressRepository,
    SubscriptionRepository,
    OrderRepository,
  ],
  exports: [
    UserRepository,
    AddressRepository,
    SubscriptionRepository,
    OrderRepository,
  ],
})
export class DatabaseModule {}
