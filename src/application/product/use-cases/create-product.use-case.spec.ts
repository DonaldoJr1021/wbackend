import { ProductRepository } from 'src/domain/product/product.respository';
import { CreateProductUseCase } from './create-product.use-case';
import { Product } from 'src/domain/product/product.entity';

describe('CreateProductUseCase', () => {
    let useCase: CreateProductUseCase;
    let repo: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        repo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        };

        useCase = new CreateProductUseCase(repo);
    });

    it('should create and save a product', async () => {
        const productData = {
            name: 'Test Product',
            description: 'Description test',
            price: 100,
            stock: 10,
            imageUrl: 'http://image.url/test.jpg',
        };
        const createdProduct: Product = {
            id: '1',
            ...productData,
        };
        repo.create.mockReturnValue(createdProduct);
        repo.save.mockResolvedValue(createdProduct);
        const result = await useCase.execute(productData);
        expect(repo.create).toHaveBeenCalledWith(productData);
        expect(repo.save).toHaveBeenCalledWith(createdProduct);
        expect(result).toEqual(createdProduct);
    });

});
