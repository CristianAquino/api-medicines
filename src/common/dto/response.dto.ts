import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({
    example: '200',
    description: 'status code',
  })
  readonly status: number;
  @ApiProperty({
    example: 'message describing the action performed',
    description: 'message describing the action performed',
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

export class SWGMessage extends ResponseDTO {
  @ApiProperty({
    example: 'data describing the action performed',
    description: 'data describing the action performed',
  })
  data: string;
}
