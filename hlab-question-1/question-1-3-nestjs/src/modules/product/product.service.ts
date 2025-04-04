import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTranslation } from 'src/entities/product-translation.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { SearchProductDto } from './dto/search-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { LanguageCode } from 'src/entities/language-code.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private readonly productTransRepository: Repository<ProductTranslation>,
    @InjectRepository(LanguageCode)
    private readonly languageCodeRepository: Repository<LanguageCode>,
  ) {}

  async createProduct(productDto: CreateProductDto) {
    const { price, productDetails } = productDto;

    const product = new Product({ price });

    const translations: ProductTranslation[] = [];
    for await(const pd of productDetails) {
      const { name, description, languageCode: code } = pd;
      let languageCode = await this.languageCodeRepository.findOne({
        where: { code },
      });

      if (!languageCode) {
        languageCode = this.languageCodeRepository.create({
          code,
        });
        languageCode = await this.languageCodeRepository.save(languageCode);
      }

      const translation = new ProductTranslation({
        name,
        description,
        langCode: languageCode,
      });
      translation.product = product;

      translations.push(translation);
    }

    const savedProduct = await this.productRepository.save(product);
    await this.productTransRepository.save(translations);

    return savedProduct;
  }

  async searchProduct(searchDto: SearchProductDto) {
    const { name, page, size = 0 } = searchDto;
    const productTransqb = this.productTransRepository
      .createQueryBuilder('pt')
      .leftJoinAndSelect('pt.product', 'p')
      .leftJoin('pt.langCode', 'lang')
      .addSelect('lang.code')
      .where('pt.name ILIKE :name', { name: `%${name}%` });

    if (size) {
      productTransqb.take(size);
    }

    if (page) {
      productTransqb.skip((page - 1) * size);
    }

    const productTranslations = await productTransqb.getMany();

    return productTranslations;
  }
}
