module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/@common/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/@common/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
