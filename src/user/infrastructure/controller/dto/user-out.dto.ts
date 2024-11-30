import { MetaPaginationData, ResponseDTO } from '@common/dto';
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

export class AllUsersData {
  @ApiProperty({
    type: [UserData],
    description: 'data',
  })
  data: UserData[];
  @ApiProperty({
    type: MetaPaginationData,
    description: 'meta',
  })
  meta: MetaPaginationData;
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

export class SWGUserGenerateKey extends ResponseDTO {
  @ApiProperty({
    example: { key: 'http://...' },
    description: 'URL generated to complete the password change process',
  })
  data: { url: string };
}
