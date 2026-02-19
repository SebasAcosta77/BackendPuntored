import { Controller, Post, Get, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { BuyRechargeUseCase } from '../../application/buy-recharge.use-case';
import { GetRechargeHistoryUseCase } from '../../application/get-recharge-history.use-case';
import { BuyRechargeDto } from '../../dto/buy-recharge.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('recharges')
@UseGuards(JwtAuthGuard)
export class RechargesController {
  constructor(
    private readonly buyRecharge: BuyRechargeUseCase,
    private readonly historyRecharge: GetRechargeHistoryUseCase,
  ) {}

  @Post('/buy')
  async buy(@Body() dto: BuyRechargeDto, @Req() req: any) {
    try {
      const { userId } = req.user;

      await this.buyRecharge.execute(userId, dto.phoneNumber, dto.amount);

      return { message: 'Recarga exitosa' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/history')
  async history(@Req() req: any) {
    const { userId } = req.user;

    return this.historyRecharge.execute(userId);
  }
}
