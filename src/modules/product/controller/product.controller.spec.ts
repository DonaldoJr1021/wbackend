import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from '../../../application/product/use-cases/create-product.use-case';
import { UpdateProductUseCase } from '../../../application/product/use-cases/update-product.use-case';
import { FindProductUseCase } from '../../../application/product/use-cases/find-product.use-case';
import { Product } from '../../../domain/product/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let createUseCase: CreateProductUseCase;
  let updateUseCase: UpdateProductUseCase;
  let findUseCase: FindProductUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindProductUseCase,
          useValue: { execute: jest.fn(), executeAll: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    createUseCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    updateUseCase = module.get<UpdateProductUseCase>(UpdateProductUseCase);
    findUseCase = module.get<FindProductUseCase>(FindProductUseCase);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [{ id: '1', name: 'Product1', description: '', price: 10, stock: 5, imageUrl: '' }];
      jest.spyOn(findUseCase, 'executeAll').mockResolvedValue(products);

      const result = await controller.findAll();
      expect(findUseCase.executeAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product: Product = { id: '1', name: 'Product1', description: '', price: 10, stock: 5, imageUrl: '' };
      jest.spyOn(findUseCase, 'execute').mockResolvedValue(product);

      const result = await controller.findOne('1');
      expect(findUseCase.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(product);
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const dto = { name: 'New Product', description: '', price: 20, stock: 10, imageUrl: '' };
      const product: Product = { id: '2', ...dto };
      jest.spyOn(createUseCase, 'execute').mockResolvedValue(product);

      const result = await controller.create(dto);
      expect(createUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      const dto = { name: 'Updated Product' };
      const product: Product = { id: '1', name: 'Updated Product', description: '', price: 10, stock: 5, imageUrl: '' };
      jest.spyOn(updateUseCase, 'execute').mockResolvedValue(product);

      const result = await controller.update('1', dto);
      expect(updateUseCase.execute).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(product);
    });
  });
});
