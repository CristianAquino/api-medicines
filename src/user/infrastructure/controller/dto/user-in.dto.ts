import { IsNotEqualTo } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Role, RoleList } from '../enum/user.enum';

export class IdUserDTO {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'user id',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
export class CreateUserDTO {
  @ApiProperty({
    required: true,
    example: 'lorem',
    description: 'username',
  })
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
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly oldPassword: string;
  @ApiProperty({
    required: true,
    example: 'lorem1234',
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsNotEqualTo('oldPassword')
  readonly newPassword: string;
}

export class UpdateDataByUserDTO {
  @ApiProperty({
    required: false,
    example: 'lorem',
    description: 'new username',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  readonly username?: string;
}

export class UpdateDataUserByAdminDTO extends IdUserDTO {
  @ApiProperty({
    required: false,
    example: Role.USER,
    description: 'role user',
    enum: RoleList,
    default: Role.USER,
  })
  @IsString()
  @IsEnum(RoleList, {
    message: `Possible status value are ${RoleList}`,
  })
  @IsOptional()
  readonly role?: Role;
}

export class PaginationDTO {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'page',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;
  @ApiProperty({
    required: false,
    example: 10,
    description: 'limit',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10;
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
