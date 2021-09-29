import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '1234';
const API_KEY_PROD = 'PROD123';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: 'root',
  port: 5432,
});
client.connect();
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
