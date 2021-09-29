import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

const API_KEY = '1234';
const API_KEY_PROD = 'PROD123';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbUser, dbHost, dbDatabase, dbPassword, dbPort } =
          configService.postgres;
        const client = new Client({
          user: dbUser,
          host: dbHost,
          database: dbDatabase,
          password: dbPassword,
          port: dbPort,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
