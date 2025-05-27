import { Test, TestingModule } from '@nestjs/testing';
import { TypeormProductRepository } from './typeorm-product.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../domain/product/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TypeormProductRepository', () => {
  let repo: TypeormProductRepository;
  let typeormRepo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeormProductRepository,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    repo = module.get<TypeormProductRepository>(TypeormProductRepository);
    typeormRepo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const expected = [{ id: '1', name: 'product1' }] as Product[];

      jest.spyOn(typeormRepo, 'find').mockResolvedValue(expected);

      const result = await repo.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('should return a product if found', async () => {
      const product = { id: '1', name: 'product1' } as Product;
      jest.spyOn(typeormRepo, 'findOne').mockResolvedValue(product);

      const result = await repo.findById('1');
      expect(result).toEqual(product);
    });

    it('should return null if product not found', async () => {
      jest.spyOn(typeormRepo, 'findOne').mockResolvedValue(null);

      const result = await repo.findById('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should call repo.create and return the product entity', () => {
      const data = { name: 'New Product' };
      const createdEntity = { ...data } as Product;

      jest.spyOn(typeormRepo, 'create').mockReturnValue(createdEntity);

      const result = repo.create(data);
      expect(result).toEqual(createdEntity);
    });
  });

  describe('save', () => {
    it('should save and return the product', async () => {
      const product = { id: '1', name: 'product1' } as Product;
      jest.spyOn(typeormRepo, 'save').mockResolvedValue(product);

      const result = await repo.save(product);
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
  it('should update and return the updated product', async () => {
    const product = {
      id: '1',
      name: 'product1',
      description: 'desc',
      price: 50,
      stock: 10,
      imageUrl: 'url',
    } as Product;

    const updatedData = { name: 'Updated Product' };

    jest.spyOn(typeormRepo, 'findOne').mockResolvedValue(product);
    jest.spyOn(typeormRepo, 'save').mockImplementation(async (prod) => prod as Product);

    const result = await repo.update('1', updatedData);

    expect(typeormRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(typeormRepo.save).toHaveBeenCalled();
    expect(result.name).toBe(updatedData.name);
    expect(result.description).toBe(product.description);
  });

  it('should throw NotFoundException if product not found', async () => {
    jest.spyOn(typeormRepo, 'findOne').mockResolvedValue(null);

    await expect(repo.update('non-existent-id', { name: 'x' })).rejects.toThrow(NotFoundException);
  });
});

});
