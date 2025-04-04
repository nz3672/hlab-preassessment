import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './src/entities/product.entity';
import { ProductTranslation } from './src/entities/product-translation.entity';
import { LanguageCode } from './src/entities/language-code.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Product, ProductTranslation, LanguageCode],
  migrations: ['**/migrations/*-migration.{ts, js}'],
  migrationsRun: false,
  logging: true,
});