import { ApiProperty } from '@nestjs/swagger';

export class MetaPaginationData {
  @ApiProperty({
    example: 1,
    description: 'page',
  })
  page: number;
  @ApiProperty({
    example: 10,
    description: 'limit',
  })
  last_page: number;
  @ApiProperty({
    example: 10,
    description: 'total pages',
  })
  total: number;
}
