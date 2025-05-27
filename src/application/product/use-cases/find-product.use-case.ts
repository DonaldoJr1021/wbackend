import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/product/product.entity';
import { ProductRepository } from 'src/domain/product/product.respository';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async executeAll(): Promise<Product[]>{
    return this.productRepo.findAll();
  }
}
