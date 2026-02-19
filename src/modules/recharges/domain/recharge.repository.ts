import { RechargeEntity } from './recharge.entity';

export abstract class RechargeRepository {
  abstract save(recharge: RechargeEntity): Promise<void>;
  abstract findByUser(userId: string): Promise<RechargeEntity[]>;
}
