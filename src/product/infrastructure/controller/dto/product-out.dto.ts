import { MetaPaginationData, ResponseDTO } from '@common/dto';
import { CategoryModel } from '@common/entities/models';
import { ApiProperty } from '@nestjs/swagger';

export class ProductData {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'product id',
  })
  id: string;
  @ApiProperty({
    example: 'Product 1',
    description: 'product name',
  })
  name: string;
  @ApiProperty({
    example: 'description of product',
    description: 'product description',
  })
  description: string;
  @ApiProperty({
    example: 'ABC123',
    description: 'product sku',
  })
  sku: string;
  @ApiProperty({
    example: 10,
    description: 'product quantity',
  })
  stock: number;
  @ApiProperty({
    example: 10.5,
    description: 'product unit price',
  })
  unit_price: number;
  @ApiProperty({
    example: '2024-10-01',
    description: 'product expiration date',
  })
  expiration_date: Date;
  @ApiProperty({
    type: CategoryModel,
    description: 'category',
  })
  category: CategoryModel;
  @ApiProperty({
    example: true,
    description: 'product available',
  })
  available: boolean;
}

export class AllProductsData {
  @ApiProperty({
    type: [ProductData],
    description: 'data',
  })
  data: ProductData[];
  @ApiProperty({
    type: MetaPaginationData,
    description: 'meta',
  })
  meta: MetaPaginationData;
}

export class SWGAllProductData extends ResponseDTO {
  @ApiProperty({
    type: AllProductsData,
    description: 'data',
  })
  data: AllProductsData;
}
