import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/product/product.entity';
import { ProductRepository } from 'src/domain/product/product.respository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, data);
    return this.productRepo.save(product);
  }
}
