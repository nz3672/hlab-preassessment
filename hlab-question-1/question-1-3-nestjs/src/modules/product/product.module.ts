import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from '../../entities/product-translation.entity';
import { Product } from '../../entities/product.entity';
import { LanguageCode } from '../../entities/language-code.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTranslation, Product, LanguageCode])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
