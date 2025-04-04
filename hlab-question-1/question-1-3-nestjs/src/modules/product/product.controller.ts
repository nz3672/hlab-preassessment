import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchProducts(@Query() query: SearchProductDto) {
    const result = await this.productService.searchProduct(query);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() body: CreateProductDto) {
    const result = await this.productService.createProduct(body);
    return result;
  }
}
