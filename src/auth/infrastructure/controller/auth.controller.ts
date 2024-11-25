import { LoginUseCase, LogoutUseCase } from '@auth/usecases';
import { ResponseErrorDTO } from '@common/dto';
import { JwtAuthGuard, LoginGuard } from '@common/guards';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDTO } from './dto';

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal error',
  type: ResponseErrorDTO,
})
@ApiResponse({
  status: HttpStatus.CONFLICT,
  description: 'Conflict',
  type: ResponseErrorDTO,
})
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USECASE_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
    @Inject(UsecaseProxyModule.LOGOUT_USECASE_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCase>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ description: 'Login' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO, @Req() request: Request) {
    const user: any = request.user;
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(user.id, user.role);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: 'Logout' })
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }
}
