import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';
import { UpdateProductDTO } from '@product/infrastructure/controller/dto';

export class PutUpdateDataProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: UpdateProductDTO): Promise<string> {
    const { category, ...updated } = data;
    const product = await this.productRepository.findById(updated.id);
    if (!product) {
      this.logger.warn(
        'PutUpdateDataProductUseCase',
        'Product not found, please check the information',
      );
      throw new NotFoundException(
        'Product not found, please check the information',
      );
    }
    if (category) {
      const findCategory = await this.categoryRepository.findByCategoryName(
        category,
      );
      if (!findCategory) {
        this.logger.warn(
          'PutUpdateDataProductUseCase',
          'Category not found, please check the information',
        );
        throw new NotFoundException(
          'Category not found, please check the information',
        );
      }
      product.category = findCategory;
      await this.productRepository.updateProductCategory(product);
    }
    await this.productRepository.updateProduct(updated);
    this.logger.log(
      'PutUpdateDataProductUseCase',
      'Product updated successfully',
    );
    return 'Product updated successfully';
  }
}
