import { ResponseDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryData {
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

export class SWGAllCategoryData extends ResponseDTO {
  @ApiProperty({
    type: [CategoryData],
    description: 'data',
  })
  data: CategoryData[];
}
