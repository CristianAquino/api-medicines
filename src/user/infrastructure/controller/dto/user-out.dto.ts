import { ResponseDTO } from '@common/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserData {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'user id',
  })
  id: string;
  @ApiProperty({
    example: 'lorem',
    description: 'username',
  })
  username: string;
  @ApiProperty({
    example: 'user',
    description: 'role user',
  })
  role: string;
}

export class MetaPaginationUserData {
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

export class ReturnAllUserData {
  @ApiProperty({
    type: [ReturnUserData],
    description: 'data',
  })
  data: ReturnUserData[];
  @ApiProperty({
    type: MetaPaginationUserData,
    description: 'meta',
  })
  meta: MetaPaginationUserData;
}

export class SWGReturnAllUserData extends ResponseDTO {
  @ApiProperty({
    type: ReturnAllUserData,
    description: 'data',
  })
  data: ReturnAllUserData;
}
export class SWGReturnUserData extends ResponseDTO {
  @ApiProperty({
    type: ReturnUserData,
    description: 'data',
  })
  data: ReturnUserData;
}
