import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';
import { ProductDTO } from '@product/infrastructure/controller/dto';

export class GetAllProductsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<ProductDTO[]> {
    const allProducts = await this.productRepository.getAllProducts();
    if (allProducts.length == 0) {
      this.logger.warn('GetAllProductsUseCase execute', 'Products not found');
      throw new NotFoundException('Products not found');
    }
    this.logger.log('GetAllProductsUseCase execute', 'Return all products');
    return allProducts;
  }
}
