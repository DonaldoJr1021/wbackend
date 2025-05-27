import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }
}
