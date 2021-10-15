import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const configDefault = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['dist/entities/**/*entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['dist/src/@common/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/@common/migrations/migrations',
    },
    apiKey: process.env.API_KEY,
    //entities: [(process.env.NODE_ENV === 'local' ? 'src/entities/**/*.ts' : 'dist/entities/**/*.js' )]
  };
  console.log(process.env.DB_TYPE);

  return {
    users: {
      ...configDefault,
    },
    products: {
      ...configDefault,
    },
  };
});
