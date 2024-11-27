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
      const findCategory = await this.categoryRepository.findCategoryByName(
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
    if (product.stock - updated.stock < 0) {
      this.logger.warn(
        'PutUpdateDataProductUseCase',
        'Stock cannot be negative',
      );
      throw new NotFoundException('Stock cannot be negative');
    }
    await this.productRepository.updateProduct({
      ...updated,
      available:
        updated.available ?? product.stock - updated.stock !== 0 ? true : false,
    });
    this.logger.log(
      'PutUpdateDataProductUseCase',
      `Product ${product.name} updated successfully`,
    );
    return `Product ${product.name} updated successfully`;
  }
}
