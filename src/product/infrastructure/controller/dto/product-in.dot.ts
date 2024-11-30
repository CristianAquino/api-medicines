import { AllowedDate, Trim } from '@common/decorators';
import { PaginationDTO, UUIDIdDTO } from '@common/dto';
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
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductDTO {
  @ApiProperty({
    required: true,
    example: 'Buscapina',
    description: 'product name',
  })
  @Trim()
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
  @Transform(({ value, obj }) =>
    value?.trim() === '' ? obj.name.replace(/\s+/g, '') : value,
  )
  readonly sku: string;
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
    example: 10.63,
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
  @AllowedDate()
  readonly expiration_date: Date;
  @ApiProperty({
    required: true,
    example: 'description of product',
    description: 'product description',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  readonly description: string;
}

export class AddProductDTO extends ProductDTO {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'category id',
  })
  @IsPositive()
  @IsNotEmpty()
  readonly category: number;
}

export class UpdateProductDTO extends UUIDIdDTO {
  @ApiProperty({
    required: false,
    example: 'Buscapina',
    description: 'product name',
  })
  @Trim()
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
  @Trim()
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
  @AllowedDate()
  @IsOptional()
  readonly expiration_date?: Date;
  @ApiProperty({
    required: false,
    example: 'description of product',
    description: 'product description',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsOptional()
  readonly description?: string;
  @ApiProperty({
    required: false,
    example: 1,
    description: 'category id',
  })
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly category?: number;
  @ApiProperty({
    required: false,
    example: true,
    description: 'product availability',
  })
  @IsBoolean()
  @IsOptional()
  readonly available?: boolean;
}

export class FindAllProductsDTO extends PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'product name',
  })
  @Trim()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;
  @ApiProperty({
    required: false,
    description: 'category id',
  })
  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  readonly category?: number;
}
