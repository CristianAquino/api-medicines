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
    const { category: categoryName, ...product } = data;
    const categoryResponse = await this.categoryRepository.findByCategoryName(
      categoryName,
    );
    if (!categoryResponse) {
      this.logger.warn(
        'AddProductUseCase',
        `The category ${categoryName} not exists`,
      );
      throw new NotFoundException(`The category ${categoryName} not exists`);
    }
    await this.productRepository.createProduct({
      ...product,
      category: categoryResponse,
    });
    this.logger.log('AddProductUseCase', 'New product have been added');
    return 'New product have been added';
  }
}
