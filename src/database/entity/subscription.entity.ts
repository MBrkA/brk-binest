import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CurrencyType } from '../enum/currency.enum';
import { UserEntity } from './user.entity';
import { FrequencyType } from '../enum/frequency.enum';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  user: UserEntity;

  @Column({ type: 'enum', enum: CurrencyType })
  currency: CurrencyType;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: FrequencyType })
  frequency: FrequencyType;

  @Column()
  nextPaymentAt: Date;

  @Column()
  stripeCardId: number;

  @Column('int', { default: 0 })
  paymentTryCount: number;

  @Column('boolean', { default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
