import { IsString, IsNumber, Matches, Min, Max } from 'class-validator';

export class BuyRechargeDto {
  @IsString()
  @Matches(/^3\d{9}$/, {
    message:
      'El número debe iniciar en 3 y tener exactamente 10 dígitos numéricos',
  })
  phoneNumber: string;

  @Min(1000, { message: 'El valor mínimo es 1.000' })
  @Max(100000, { message: 'El valor máximo es 100.000' })
  @IsNumber()
  amount: number;
}
