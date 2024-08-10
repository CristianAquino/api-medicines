import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { envs } from '@common/config/environment-config';

@Module({
  imports: [
    Jwt.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}
