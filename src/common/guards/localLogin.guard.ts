import { LoginDTO } from '@auth/infrastructure/controller/dto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalLoginValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const loginDto = plainToInstance(LoginDTO, request.body);

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new UnauthorizedException(
        errors.map((e) => Object.values(e.constraints)).flat(),
      );
    }
    request.body = loginDto;
    return true;
  }
}
