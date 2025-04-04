import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      migrations: ['../migrations/**/*{.ts,.js}'],
      autoLoadEntities: true,
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}