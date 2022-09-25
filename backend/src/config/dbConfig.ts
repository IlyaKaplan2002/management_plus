import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SCHEMA, NODE_ENV } =
  process.env;

const getDbConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  schema: DB_SCHEMA || 'prod',
  entities:
    NODE_ENV === 'production'
      ? ['dist/modules/**/*.entity.js']
      : ['src/modules/**/*.entity.ts'],
  migrations:
    NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],
  subscribers:
    NODE_ENV === 'production'
      ? ['dist/modules/**/*.subscriber.js']
      : ['src/modules/**/*.subscriber.ts'],
  logging: 'all',
  logger: 'simple-console',
  maxQueryExecutionTime: 5000,
  entitySkipConstructor: true,
});

export default getDbConfig;
