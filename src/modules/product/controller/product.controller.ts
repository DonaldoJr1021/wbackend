import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { Product } from '../../../domain/product/product.entity';
import { CreateProductUseCase } from 'src/application/product/use-cases/create-product.use-case';
import { UpdateProductUseCase } from 'src/application/product/use-cases/update-product.use-case';
import { FindProductUseCase } from 'src/application/product/use-cases/find-product.use-case';
import { CreateProductDto } from 'src/application/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/application/product/dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.findProductUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.findProductUseCase.execute(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.createProductUseCase.execute(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.updateProductUseCase.execute(id, dto);
  }
}
