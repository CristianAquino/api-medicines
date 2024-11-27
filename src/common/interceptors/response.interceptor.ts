import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const { message, ...rest } = data;

        return {
          status: response.statusCode,
          message: message ?? 'Request successful',
          error: null,
          data: Object.keys(rest).length == 0 ? message : rest,
        };
      }),
    );
  }
}
