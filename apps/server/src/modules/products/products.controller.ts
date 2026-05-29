import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('occasion') occasion?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
    return this.productsService.findAll({
      search,
      category,
      occasion,
      maxPrice: parsedMaxPrice,
    });
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get('occasions')
  getOccasions() {
    return this.productsService.getOccasions();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
