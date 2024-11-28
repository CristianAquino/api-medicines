import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
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
    example: 'doll',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  readonly name: string;
  @ApiProperty({
    required: false,
    example: 'ABC123',
    description: 'product sku',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value, obj }) =>
    value?.trim() === '' ? obj.name.replace(/\s+/g, '') : value,
  )
  readonly sku?: string;
  @ApiProperty({
    required: true,
    example: 10,
    description: 'product stock',
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
  @MaxLength(128)
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
    required: false,
    example: 'doll',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;
  @ApiProperty({
    required: false,
    example: 'ABC123',
    description: 'product sku',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly sku?: string;
  @ApiProperty({
    required: false,
    example: 10,
    description: 'product stock',
  })
  @IsInt()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly stock?: number;
  @ApiProperty({
    required: false,
    example: 10.5,
    description: 'product unit price',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly unit_price?: number;
  @ApiProperty({
    required: false,
    example: '2024-10-01',
    description: 'product expiration date',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  readonly expiration_date?: Date;
  @ApiProperty({
    required: false,
    example: 'description of product',
    description: 'product description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsOptional()
  readonly description?: string;
  @ApiProperty({
    required: false,
    example: 'toys',
    description: 'category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  readonly category?: string;
  @ApiProperty({
    required: false,
    example: true,
    description: 'product availability',
  })
  @IsBoolean()
  @IsOptional()
  readonly available?: boolean;
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

export class FindAllProductsDTO extends PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'product name',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;
}
