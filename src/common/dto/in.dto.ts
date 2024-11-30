import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class UUIDIdDTO {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}

export class NumberIdDTO {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'number id',
  })
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
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
