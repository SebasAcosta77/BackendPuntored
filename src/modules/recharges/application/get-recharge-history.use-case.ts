import { Injectable } from '@nestjs/common';
import { RechargeRepository } from '../domain/recharge.repository';
import { RechargeEntity } from '../domain/recharge.entity';

@Injectable()
export class GetRechargeHistoryUseCase {
  constructor(private readonly rechargeRepository: RechargeRepository) {}

  async execute(userId: string): Promise<RechargeEntity[]> {
    return this.rechargeRepository.findByUser(userId);
  }
}
