import { ResponseDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/user.enum';

export class UserData {
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
    example: Role.USER,
    description: 'role user',
  })
  role: string;
  @ApiProperty({
    example: true,
    description: 'user available',
  })
  available: boolean;
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

export class AllUsersData {
  @ApiProperty({
    type: [UserData],
    description: 'data',
  })
  data: UserData[];
  @ApiProperty({
    type: MetaPaginationUserData,
    description: 'meta',
  })
  meta: MetaPaginationUserData;
}

export class SWGAllUsersData extends ResponseDTO {
  @ApiProperty({
    type: AllUsersData,
    description: 'data',
  })
  data: AllUsersData;
}
export class SWGUserData extends ResponseDTO {
  @ApiProperty({
    type: UserData,
    description: 'data',
  })
  data: UserData;
}
export class SWGMessage extends ResponseDTO {
  @ApiProperty({
    example: 'message describing the action performed',
    description: 'message describing the action performed',
  })
  data: string;
}
