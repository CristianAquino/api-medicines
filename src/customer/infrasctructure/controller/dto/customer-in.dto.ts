import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CustomerDTO {
  @ApiProperty({
    required: false,
    example: 'John Doe',
    description: 'Full names of the customer',
  })
  @IsString()
  @IsOptional()
  readonly full_names?: string;
  @ApiProperty({
    required: false,
    example: 'Doe',
    description: 'Surnames of the customer',
  })
  @IsString()
  @IsOptional()
  readonly surnames?: string;
  @ApiProperty({
    required: false,
    example: '12345678',
    description: 'DNI of the customer',
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  @Transform(({ value }) => (value === '' ? '00000000' : value))
  readonly dni?: string;
}
