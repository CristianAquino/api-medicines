import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CustomerDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full names of the customer',
    default: '',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly full_names?: string;
  @ApiProperty({
    example: 'Doe',
    description: 'Surnames of the customer',
    default: '',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly surnames?: string;
  @ApiProperty({
    example: '12345678',
    description: 'DNI of the customer',
    default: '00000000',
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  readonly dni?: string;
}
