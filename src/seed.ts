import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from './domain/product/product.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const productRepo = dataSource.getRepository(Product);

  const products = [
    {
      name: 'Camiseta Negra',
      description: 'Camiseta básica unisex',
      price: 49000,
      stock: 10,
      imageUrl: 'https://ejemplo.com/camiseta.jpg',
    },
    {
      name: 'Sudadera Azul',
      description: 'Sudadera con capucha',
      price: 89000,
      stock: 5,
      imageUrl: 'https://ejemplo.com/sudadera.jpg',
    },
  ];

  await productRepo.save(products);
  console.log('✅ Productos insertados exitosamente');
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Error al insertar datos', e);
  process.exit(1);
});
