import { IsNotEqualTo, Trim } from '@common/decorators';
import { PaginationDTO, UUIDIdDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role, RoleList } from '../enum/user.enum';

export class CreateUserDTO {
  @ApiProperty({
    required: true,
    example: 'lorem',
    description: 'username',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;
  @ApiProperty({
    required: true,
    example: Role.USER,
    description: 'role user',
    enum: RoleList,
    default: Role.USER,
  })
  @Trim()
  @IsString()
  @IsEnum(RoleList, {
    message: `Possible status value are ${RoleList}`,
  })
  readonly role: Role = Role.USER;
}

export class UpdatePasswordDTO {
  @ApiProperty({
    required: true,
    example: 'lorem1234',
    description: 'password',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly oldPassword: string;
  @ApiProperty({
    required: true,
    example: 'lorem1234',
    description: 'password',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsNotEqualTo('oldPassword')
  readonly newPassword: string;
}

export class UpdateDataByUserDTO {
  @ApiProperty({
    required: true,
    example: 'lorem',
    description: 'new username',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;
}

export class UpdateDataUserByAdminDTO extends UUIDIdDTO {
  @ApiProperty({
    required: true,
    example: Role.USER,
    description: 'role user',
    enum: RoleList,
    default: Role.USER,
  })
  @Trim()
  @IsString()
  @IsEnum(RoleList, {
    message: `Possible status value are ${RoleList}`,
  })
  readonly role: Role;
}

export class FindAllUsersDTO extends PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'username',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly username?: string;
  @ApiProperty({
    required: false,
    description: 'roles for user',
    enum: RoleList,
  })
  @IsString()
  @IsEnum(RoleList, {
    message: `Possible status value are ${RoleList}`,
  })
  @IsOptional()
  readonly role?: Role;
}
