import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
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
export class ProductDTO {
  @ApiProperty({
    required: true,
    example: 'medicines',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  readonly name: string;
  @ApiProperty({
    required: true,
    example: 'ABC123',
    description: 'product sku',
  })
  @IsString()
  @IsNotEmpty()
  readonly sku: string;
  @ApiProperty({
    required: true,
    example: 10,
    description: 'product quantity',
  })
  @IsInt()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;
  @ApiProperty({
    required: true,
    example: 10.5,
    description: 'product unit price',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly unit_price: number;
  @ApiProperty({
    required: true,
    example: '2024-10-01',
    description: 'product expiration date',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly expiration_date: Date;
  @ApiProperty({
    required: true,
    example: 'description of product',
    description: 'product description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  readonly description: string;
}

export class AddProductDTO extends ProductDTO {
  @ApiProperty({
    required: true,
    example: 'toys',
    description: 'category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly category: string;
}

export class UpdateProductDTO extends IdProductDTO {
  @ApiProperty({
    example: 'medicines',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;
  @ApiProperty({
    example: 'ABC123',
    description: 'product sku',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly sku?: string;
  @ApiProperty({
    example: 10,
    description: 'product quantity',
  })
  @IsInt()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly stock?: number;
  @ApiProperty({
    example: 10.5,
    description: 'product unit price',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly unit_price?: number;
  @ApiProperty({
    example: '2024-10-01',
    description: 'product expiration date',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  readonly expiration_date?: Date;
  @ApiProperty({
    example: 'description of product',
    description: 'product description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly description?: string;
  @ApiProperty({
    example: 'toys',
    description: 'category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  readonly category?: string;
}
