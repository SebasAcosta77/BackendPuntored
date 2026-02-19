import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RechargeTransactionOrmEntity } from './recharge-transaction.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(
    () => RechargeTransactionOrmEntity,
    (tx) => tx.user,
  )
  recharges: RechargeTransactionOrmEntity[];
}
