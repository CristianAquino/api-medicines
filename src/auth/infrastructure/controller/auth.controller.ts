import { LoginUseCase, LogoutUseCase } from '@auth/usecases';
import { ResponseErrorDTO } from '@common/dto';
import { UserModel } from '@common/entities/models';
import { JwtAuthGuard, LoginGuard } from '@common/guards';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
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
export class AuthController {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USECASE_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
    @Inject(UsecaseProxyModule.LOGOUT_USECASE_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCase>,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ description: 'Login' })
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: Request) {
    const user = request.user as UserModel;
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(user.id, user.role, user.available);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Login successful';
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiCookieAuth()
  @ApiOperation({ description: 'Logout' })
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }
}
