import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ProductTranslationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  languageCode: string;
}