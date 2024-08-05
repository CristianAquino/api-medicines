import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { envs } from '../environment-config';

let typeOrmModule: TypeOrmModule;

if (envs.nodeEnv === 'production') {
  typeOrmModule = {
    type: 'postgres',
    host: envs.databaseHost,
    port: envs.databasePort,
    username: envs.databaseUsername,
    password: envs.databasePassword,
    database: envs.databaseName,
    entities: [
      path.join(__dirname, '.', '..', '..', '**', '*.entity{.ts,.js}'),
    ],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: envs.synchronize,
  };
} else {
  typeOrmModule = {
    type: 'sqlite',
    database: 'db-dev.sqlite',
    entities: [
      path.join(__dirname, '.', '..', '..', '**', '*.entity{.ts,.js}'),
    ],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: envs.synchronize,
  };
}

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModule)],
})
export class TypeOrmConfigModule {}
