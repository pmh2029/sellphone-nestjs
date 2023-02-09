import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UpdateProductDto, CreateProductDto } from './product.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/page')
  @UseGuards(JwtAuthGuard)
  async getAllProductsWithPagination(
    @Query('page') page: string,
    @Query('per_page') perPage: string,
  ) {
    if (page === '' && perPage === '') {
      return this.productService.getAllProductsWithPagination(1, 15);
    }

    if (page === '' && perPage !== '') {
      return this.productService.getAllProductsWithPagination(
        1,
        parseInt(perPage),
      );
    }

    return this.productService.getAllProductsWithPagination(
      parseInt(page),
      parseInt(perPage),
    );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(parseInt(id));
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(parseInt(id));
  }
}
