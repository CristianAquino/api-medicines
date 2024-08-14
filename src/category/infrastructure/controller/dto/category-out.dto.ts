import { ApiProperty } from '@nestjs/swagger';

export class ReturnCategory {
  @ApiProperty({
    example: 1,
    description: 'category id',
  })
  id: number;
  @ApiProperty({
    example: 'toys',
    description: 'category name',
  })
  category: string;
  @ApiProperty({
    example: 10,
    description: 'total products in category',
  })
  total_products: number;
}
