import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';
import { AddProductDTO } from '@product/infrastructure/controller/dto';

export class AddProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: AddProductDTO): Promise<string> {
    const { category, ...product } = data;
    const categoryResponse = await this.categoryRepository.findCategoryById(
      category,
    );
    if (!categoryResponse) {
      this.logger.warn(
        'AddProductUseCase',
        'Invalid category or does not exist',
      );
      throw new NotFoundException('Invalid category or does not exist');
    }
    await this.productRepository.addProduct({
      ...product,
      category: categoryResponse,
    });
    this.logger.log(
      'AddProductUseCase',
      `New product ${data.name} have been added`,
    );
    return `New product ${data.name} have been added`;
  }
}
