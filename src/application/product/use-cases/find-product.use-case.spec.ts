import { NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/product/product.entity';
import { FindProductUseCase } from './find-product.use-case';

describe('FindProductUseCase', () => {
  let useCase: FindProductUseCase;
  let productRepo: any; 

  beforeEach(() => {
    productRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new FindProductUseCase(productRepo);
  });

  describe('execute', () => {
    it('should return a product if found', async () => {
      const product = { id: '1', name: 'Test Product' } as Product;
      productRepo.findById.mockResolvedValue(product);

      const result = await useCase.execute('1');
      expect(productRepo.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      productRepo.findById.mockResolvedValue(null);

      await expect(useCase.execute('1')).rejects.toThrow(NotFoundException);
      expect(productRepo.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('executeAll', () => {
    it('should return a list of products', async () => {
      const products = [
        { id: '1', name: 'Product 1' } as Product,
        { id: '2', name: 'Product 2' } as Product,
      ];
      productRepo.findAll.mockResolvedValue(products);

      const result = await useCase.executeAll();
      expect(productRepo.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });
});
