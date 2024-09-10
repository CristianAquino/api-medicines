import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';
import {
  AllProductsData,
  FindAllProductsDTO,
} from '@product/infrastructure/controller/dto';

export class GetAllProductsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    findAllProductsDTO: FindAllProductsDTO,
  ): Promise<AllProductsData> {
    const allProducts = await this.productRepository.findAllProducts(
      findAllProductsDTO,
    );
    if (allProducts.meta.total == 0) {
      this.logger.log('GetAllProductsUseCase', 'Products not found');
      throw new NotFoundException('Products not found');
    }
    this.logger.log('GetAllProductsUseCase', 'Return all products');
    return allProducts;
  }
}
