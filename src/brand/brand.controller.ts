import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBrands() {
    return await this.brandService.getAllBrands();
  }
}
