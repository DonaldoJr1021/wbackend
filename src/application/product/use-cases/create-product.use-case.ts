import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/product/product.entity';
import { ProductRepository } from 'src/domain/product/product.respository';


@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(data: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }
}
