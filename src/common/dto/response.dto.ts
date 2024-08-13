import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({
    example: '200',
    description: 'status code',
  })
  readonly status: number;
  @ApiProperty({
    example: 'Request successful',
    description: 'message',
  })
  readonly message: string;
}

export class ResponseErrorDTO {
  @ApiProperty({
    example: '400',
    description: 'status code',
  })
  readonly status: number;
  @ApiProperty({
    example: ['Bad Request Error'],
    description: 'error message',
  })
  readonly message: string[];
  @ApiProperty({
    example: 'BadRequestException',
  })
  readonly error: string;
}
