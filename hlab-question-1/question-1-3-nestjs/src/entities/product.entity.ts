import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @OneToMany(() => ProductTranslation, (productTrans) => productTrans.product)
  productTranslations: ProductTranslation[];

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
  }
}
