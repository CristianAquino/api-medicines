import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';

export class DeleteProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const { name } = await this.productRepository.deleteById(id);
    if (!name) {
      this.logger.warn(
        'DeleteProductUseCase',
        'Product not found, please check the information',
      );
      throw new NotFoundException(
        'Producty not found, please check the information',
      );
    }
    this.logger.log(
      'DeleteProductUseCase',
      `Product ${name} have been deleted`,
    );
    return `Product ${name} have been deleted`;
  }
}
