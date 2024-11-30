import { PaginationDTO } from '@common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class FindAllOrderDetailsDTO extends PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'date order',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly date?: Date;
}
