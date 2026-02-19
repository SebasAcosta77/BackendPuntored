export class RechargeSucceededEvent {
  constructor(
    public readonly rechargeId: string,
    public readonly phoneNumber: string,
  ) {}
}
