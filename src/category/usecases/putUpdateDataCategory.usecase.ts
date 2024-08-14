import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { CategoryUpdateDTO } from '@category/infrastructure/controller/dto';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class PutUpdateDataCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CategoryUpdateDTO) {
    const category = await this.categoryRepository.findById(data.id);

    if (!category) {
      this.logger.warn(
        'PutUpdateDataCategoryUseCase',
        'Category not found, please check the information',
      );
      throw new NotFoundException(
        'Category not found, please check the information',
      );
    }

    if (
      category.category.toLocaleLowerCase() == data.category.toLocaleLowerCase()
    ) {
      this.logger.warn(
        'PutUpdateDataCategoryUseCase',
        'Category name already exists',
      );
      throw new Error('Category name already exists');
    }

    await this.categoryRepository.update(data);
    this.logger.log(
      'PutUpdateDataCategoryUseCase',
      'Category updated successfully',
    );
    return 'Category updated successfully';
  }
}
