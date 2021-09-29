import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.PORT,
    },
    postgres: {
      dbHost: process.env.DB_HOST,
      dbPort: +process.env.DB_PORT,
      dbDatabase: process.env.DB_DATABASE,
      dbUser: process.env.DB_USERNAME,
      dbPassword: process.env.DB_PASSWORD,
    },
    apiKey: process.env.API_KEY,
  };
});
