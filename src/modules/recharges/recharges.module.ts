import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RechargesController } from './infrastructure/controllers/recharges.controller';
import { BuyRechargeUseCase } from './application/buy-recharge.use-case';
import { GetRechargeHistoryUseCase } from './application/get-recharge-history.use-case';

import { RechargeRepository } from './domain/recharge.repository';
import { RechargeTypeOrmRepository } from './infrastructure/repositories/recharge.typeorm.repository';

import { RechargeTransactionOrmEntity } from 'src/database/entities/recharge-transaction.orm-entity';
import { InMemoryEventBus } from './infrastructure/event-bus/in-memory-event-bus';

@Module({
  imports: [
    TypeOrmModule.forFeature([RechargeTransactionOrmEntity]),
  ],
  controllers: [RechargesController],
  providers: [
    BuyRechargeUseCase,
    GetRechargeHistoryUseCase,
    InMemoryEventBus,
    {
      provide: RechargeRepository,
      useClass: RechargeTypeOrmRepository,
    },
  ],
})
export class RechargesModule {}
