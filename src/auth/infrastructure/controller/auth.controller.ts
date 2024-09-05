import { LoginUseCase, LogoutUseCase } from '@auth/usecases';
import { ResponseErrorDTO } from '@common/dto';
import { UserModel } from '@common/entities/models';
import { JwtAuthGuard, LoginGuard } from '@common/guards';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
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
import {
  SWGMessage,
  UpdatePasswordDTO,
} from '@user/infrastructure/controller/dto';
import { PutUpdatePasswordUserUseCase } from '@user/usecases';
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
    @Inject(UsecaseProxyModule.PUT_UPDATE_PASSWORD_USER_USECASE_PROXY)
    private readonly putUpdatePasswordUserUsecaseProxy: UseCaseProxy<PutUpdatePasswordUserUseCase>,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ description: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
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
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Put('update-password')
  @ApiBody({ type: UpdatePasswordDTO })
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SWGMessage })
  @HttpCode(HttpStatus.ACCEPTED)
  async putUpdatePassword(
    @Query('key') key: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    const response = await this.putUpdatePasswordUserUsecaseProxy
      .getInstance()
      .updatePassword({ key, password: updatePasswordDTO.newPassword });
    return response;
  }
}
