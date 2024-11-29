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
    const category = await this.categoryRepository.findCategoryById(data.id);

    if (!category) {
      this.logger.warn(
        'PutUpdateDataCategoryUseCase',
        `Category ${data.category} not found, please check the information`,
      );
      throw new NotFoundException(
        `Category ${data.category} not found, please check the information`,
      );
    }

    if (category.category == data.category) {
      this.logger.warn(
        'PutUpdateDataCategoryUseCase',
        `The category ${data.category} already exists`,
      );
      throw new Error(`The category ${data.category} already exists`);
    }

    await this.categoryRepository.updateCategory(data);
    this.logger.log(
      'PutUpdateDataCategoryUseCase',
      `The ${category.category} category has been updated to ${data.category}`,
    );
    return `The ${category.category} category has been updated to ${data.category}`;
  }
}
