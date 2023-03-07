import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  user: UserEntity;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column()
  neighbourhood: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  apartment: string | null;

  @Column()
  buildingNo: number;

  @Column({ nullable: true })
  floor: number | null;

  @Column()
  doorNo: number;

  @Column()
  zipcode: string;

  @Column('boolean', { default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
