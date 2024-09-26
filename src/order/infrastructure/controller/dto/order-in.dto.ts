import { CustomerDTO } from '@customer/infrasctructure/controller/dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentDTO } from '@payment/infrastructure/controller/dto';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class IdProductDTO {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'product id',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}

export class OrderDTO extends IdProductDTO {
  @ApiProperty({
    required: true,
    example: 2,
    description: 'quantity of product',
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
  @ApiProperty({
    required: true,
    example: 10,
    description: 'result of quantity * unit_price',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly total: number;
}
export class AddOrderDTO {
  @ApiProperty({
    type: [OrderDTO],
    description: 'order information',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderDTO)
  readonly orders: OrderDTO[];
  @ApiProperty({
    type: CustomerDTO,
    description: 'customer information',
  })
  @ValidateNested()
  @Type(() => CustomerDTO)
  readonly customer: CustomerDTO;
  @ApiProperty({
    type: PaymentDTO,
    description: 'payment information',
  })
  @ValidateNested()
  @Type(() => PaymentDTO)
  readonly payment: PaymentDTO;
}

export class PaginationDTO {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'page',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;
  @ApiProperty({
    required: false,
    example: 10,
    description: 'limit',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10;
}
