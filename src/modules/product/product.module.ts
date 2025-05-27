import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../../domain/product/product.entity';
import { ProductController } from './controller/product.controller';
import { CreateProductUseCase } from 'src/application/product/use-cases/create-product.use-case';
import { UpdateProductUseCase } from 'src/application/product/use-cases/update-product.use-case';
import { FindProductUseCase } from 'src/application/product/use-cases/find-product.use-case';
import { TypeormProductRepository } from 'src/infrastructure/product/typeorm-product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: TypeormProductRepository,
    },
    CreateProductUseCase,
    UpdateProductUseCase,
    FindProductUseCase,
  ],
  exports: [
    CreateProductUseCase,
    UpdateProductUseCase,
    FindProductUseCase,
  ],
})
export class ProductModule {}
