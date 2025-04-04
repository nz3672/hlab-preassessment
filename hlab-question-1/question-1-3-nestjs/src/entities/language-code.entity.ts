import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity('language-code')
export class LanguageCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  // To be able to understand and differentiate each language code (For accessibility)
  @Column({ nullable: true })
  name: string;

  @OneToMany(() => ProductTranslation, (productTrans) => productTrans.langCode)
  productTranslations: ProductTranslation[];
}
