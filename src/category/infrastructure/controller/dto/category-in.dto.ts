import { Trim } from '@common/decorators';
import { NumberIdDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CategoryDTO {
  @ApiProperty({
    required: true,
    example: 'tablets',
    description: 'category name',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  readonly category: string;
}
export class CategoryQueryDTO {
  @ApiProperty({
    required: false,
    description: 'category name',
  })
  @Trim()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  readonly category?: string;
}
export class CategoryUpdateDTO extends NumberIdDTO {
  @ApiProperty({
    required: true,
    example: 'tablets',
    description: 'category name',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  readonly category: string;
}
