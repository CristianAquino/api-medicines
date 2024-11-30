import { Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { MethodPayment, MethodPaymentList } from '../enum/payment.enum';

export class PaymentDTO {
  @ApiProperty({
    required: true,
    example: MethodPayment.CASH,
    description: 'method payment',
    enum: MethodPaymentList,
    default: MethodPayment.CASH,
  })
  @Trim()
  @IsString()
  @IsEnum(MethodPaymentList, {
    message: `Posible type value are ${MethodPaymentList}`,
  })
  readonly type: MethodPayment = MethodPayment.CASH;
}
