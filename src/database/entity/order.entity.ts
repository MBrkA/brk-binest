import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AddressEntity } from './address.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  address: AddressEntity;

  @ManyToOne(() => SubscriptionEntity, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  subscription: SubscriptionEntity;

  @Column('boolean', { default: false })
  isSuccessful: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
