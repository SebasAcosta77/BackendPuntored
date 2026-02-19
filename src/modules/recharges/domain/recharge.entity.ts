import { PhoneNumber } from "./value-objects/phone-number.vo";
import { RechargeAmount } from "./value-objects/recharge-amount.vo";

export class RechargeEntity {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly phoneNumber: PhoneNumber,
    public readonly amount: RechargeAmount,
    public readonly createdAt: Date,
  ) {}

  static create(params: {
    id: string;
    userId: string;
    phoneNumber: PhoneNumber;
    amount: RechargeAmount;
  }): RechargeEntity {
    return new RechargeEntity(
      params.id,
      params.userId,
      params.phoneNumber,
      params.amount,
      new Date(),
    );
  }

  static restore(params: {
    id: string;
    userId: string;
    phoneNumber: PhoneNumber;
    amount: RechargeAmount;
    createdAt: Date;
  }): RechargeEntity {
    return new RechargeEntity(
      params.id,
      params.userId,
      params.phoneNumber,
      params.amount,
      params.createdAt,
    );
  }
}
