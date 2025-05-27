import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './modules/transaction/transaction.controller';
import { TransactionnpmService } from './modules/transactionnpm/transactionnpm.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'wompi_test',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ProductModule,
  ],
  controllers: [AppController, TransactionController],
  providers: [AppService, TransactionnpmService],
})
export class AppModule {}
