import { Product } from './product.entity';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: Partial<Product>): Product;
  save(product: Product): Promise<Product>;
  update(id: string, data: Partial<Product>): Promise<Product>;
}
