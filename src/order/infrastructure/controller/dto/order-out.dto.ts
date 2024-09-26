import { MetaPaginationData, ResponseDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductData {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'product id',
  })
  id: string;
  @ApiProperty({
    example: 'Product Name',
    description: 'product name',
  })
  name: string;
  @ApiProperty({
    example: 20.5,
    description: 'product price',
  })
  unit_price: number;
  @ApiProperty({
    example: '00000000',
    description: 'product sku',
  })
  sku: string;
}

export class OrderData {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'order id',
  })
  id: string;
  @ApiProperty({
    example: 10,
    description: 'product quantity',
  })
  quantity: number;
  @ApiProperty({
    example: 20.5,
    description: 'order total',
  })
  total: number;
  @ApiProperty({
    example: '2021-07-21T17:32:28Z',
    description: 'order date',
  })
  createdAt: Date;
  @ApiProperty({
    type: ProductData,
    description: 'product',
  })
  product: ProductData;
}

export class AllOrdersData {
  @ApiProperty({
    type: [OrderData],
    description: 'data',
  })
  data: OrderData[];
  @ApiProperty({
    type: MetaPaginationData,
    description: 'meta',
  })
  meta: MetaPaginationData;
}

export class SWGAllOrderData extends ResponseDTO {
  @ApiProperty({
    type: AllOrdersData,
    description: 'data',
  })
  data: AllOrdersData;
}
