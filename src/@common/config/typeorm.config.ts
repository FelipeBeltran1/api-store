import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const configDefault = {
    type: process.env.DB_TYPE,
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: ['dist/entities/**/*entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['dist/src/@common/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/@common/migrations/migrations',
    },
    ssl: {
      rejectUnauthorized: false,
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
