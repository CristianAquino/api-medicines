import { Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
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
    example: 'lorem1234',
    description: 'password',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
