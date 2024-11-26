import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

export class FindAllOrderDetailsDTO extends PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'date order',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly date?: Date;
}
