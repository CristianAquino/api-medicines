import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: string;
  SYNCHRONIZE: boolean;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().required().default('local'),
    SYNCHRONIZE: joi.boolean(),
    HOST: joi.string(),
    DATABASE_PORT: joi.number(),
    DATABASE_USERNAME: joi.string(),
    DATABASE_PASSWORD: joi.string(),
    DATABASE_NAME: joi.string(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION_TIME: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  SYNCHRONIZE: process.env.NODE_ENV === 'local' ? true : false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  synchronize: envVars.SYNCHRONIZE,
  databaseHost: envVars.DATABASE_HOST,
  databasePort: envVars.DATABASE_PORT,
  databaseUsername: envVars.DATABASE_USERNAME,
  databasePassword: envVars.DATABASE_PASSWORD,
  databaseName: envVars.DATABASE_NAME,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationTime: envVars.JWT_EXPIRATION_TIME,
};
