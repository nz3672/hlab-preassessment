import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { LanguageCode } from './language-code.entity';

@Entity('product-translation')
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LanguageCode, ((langCode) => langCode))
  langCode: LanguageCode;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product) => product.productTranslations)
  product: Product;

  constructor(productTrans: Partial<ProductTranslation>) {
    Object.assign(this, productTrans);
  }
}
