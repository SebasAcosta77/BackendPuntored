import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('recharge_transactions')
export class RechargeTransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'phone_number', length: 10 })
  phoneNumber: string;

  @Column({ type: 'integer' })
  amount: number;

  @Column({ default: 'SUCCESS' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, (user) => user.recharges)
  @JoinColumn({ name: 'user_id' }) 
  user: UserOrmEntity;
}
