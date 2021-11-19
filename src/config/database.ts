import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default function createConfig(entities = [], name = 'default') : TypeOrmModuleOptions {
  let port = null, password = null, synchronize = null;

  if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT);
  }

  if (process.env.DB_PASS) {
    password = process.env.DB_PASS;
  }

  if (process.env.DB_SYNC) {
    synchronize = !!process.env.DB_SYNC;
  }

  const config : TypeOrmModuleOptions = {
    name,
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    entities,
    port,
    password,
    synchronize
  };

  return config;
}
