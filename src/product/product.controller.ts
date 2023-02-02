import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UpdateProductDto, CreateProductDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/page')
  // @UseGuards(JwtAuthGuard)
  async getAllProductsWithPagination(
    @Query('page') page: string,
    @Query('per_page') perPage: string,
  ) {
    return this.productService.getAllProductsWithPagination(
      parseInt(page),
      parseInt(perPage),
    );
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(parseInt(id));
  }

  @Patch('/:id')
  // @UseGuards(JwtAuthGuard)
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProductById(
      parseInt(id),
      updateProductDto,
    );
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(parseInt(id));
  }
}
