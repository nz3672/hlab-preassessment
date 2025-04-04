import { Type } from 'class-transformer';
import {
    ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ProductTranslationDTO } from './product-translation.dto';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDTO)
  productDetails: ProductTranslationDTO[];
}
