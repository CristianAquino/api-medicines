import { envs } from '@common/config/environment-config';
import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(context: string, message: string) {
    if (envs.nodeEnv !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }
  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }
  error(context: string, message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }
  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    if (envs.nodeEnv !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
