import { LoginUseCase } from '@auth/usecases/login.usecase';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USECASE_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForLocalStragtegy(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }
    return user;
  }
}
