import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RechargeRepository } from '../../domain/recharge.repository';
import { RechargeEntity } from '../../domain/recharge.entity';
import { PhoneNumber } from '../../domain/value-objects/phone-number.vo';
import { RechargeAmount } from '../../domain/value-objects/recharge-amount.vo';

import { RechargeTransactionOrmEntity } from 'src/database/entities/recharge-transaction.orm-entity';
import { UserOrmEntity } from 'src/database/entities/user.orm-entity';

@Injectable()
export class RechargeTypeOrmRepository implements RechargeRepository {
  constructor(
    @InjectRepository(RechargeTransactionOrmEntity)
    private readonly repository: Repository<RechargeTransactionOrmEntity>,
  ) {}

  async save(recharge: RechargeEntity): Promise<void> {
    const ormEntity = this.repository.create({
      id: recharge.id,
      phoneNumber: recharge.phoneNumber.value,
      amount: recharge.amount.value,
      status: 'SUCCESS', //
      createdAt: recharge.createdAt,
      user: {
        id: recharge.userId,
      } as UserOrmEntity,
    });

    await this.repository.save(ormEntity);
  }

  async findByUser(userId: string): Promise<RechargeEntity[]> {
    const records = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return records.map((r) =>
      RechargeEntity.restore({
        id: r.id,
        userId: r.user.id, 
        phoneNumber: new PhoneNumber(r.phoneNumber),
        amount: new RechargeAmount(r.amount),
        createdAt: r.createdAt,
      }),
    );
  }
}
