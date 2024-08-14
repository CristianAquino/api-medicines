import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class CategoryDTO {
  @ApiProperty({
    required: true,
    example: 'toys',
    description: 'category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly category: string;
}
export class CategoryIdDTO {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'category id',
  })
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}
export class CategoryUpdateDTO extends CategoryIdDTO {
  @ApiProperty({
    required: true,
    example: 'toys',
    description: 'category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly category: string;
}
