import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { RechargeRepository } from '../domain/recharge.repository';
import { PhoneNumber } from '../domain/value-objects/phone-number.vo';
import { RechargeAmount } from '../domain/value-objects/recharge-amount.vo';
import { RechargeEntity } from '../domain/recharge.entity';
import { InMemoryEventBus } from '../infrastructure/event-bus/in-memory-event-bus';
import { RechargeSucceededEvent } from '../domain/events/recharge-succeeded.event';

@Injectable()
export class BuyRechargeUseCase {
  constructor(
    private readonly rechargeRepository: RechargeRepository,
    private readonly eventBus: InMemoryEventBus,
  ) {}

  async execute(
    userId: string,
    phone: string,
    amount: number,
  ): Promise<void> {
    const phoneNumber = new PhoneNumber(phone);
    const rechargeAmount = new RechargeAmount(amount);

    const recharge = RechargeEntity.create({
      id: uuid(),
      userId,
      phoneNumber,
      amount: rechargeAmount,
    });

    await this.rechargeRepository.save(recharge);

    this.eventBus.publish(
      new RechargeSucceededEvent(
        recharge.id,
        recharge.phoneNumber.value,
      ),
    );
  }
}
