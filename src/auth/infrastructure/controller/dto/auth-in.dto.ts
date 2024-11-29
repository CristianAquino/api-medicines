import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    required: true,
    example: 'lorem',
    description: 'username',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;
  @ApiProperty({
    required: true,
    example: 'lorem1234',
    description: 'password',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
