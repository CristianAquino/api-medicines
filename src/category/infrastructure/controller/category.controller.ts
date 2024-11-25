import {
  AddCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  PutUpdateDataCategoryUseCase,
} from '@category/usecases';
import { ResponseErrorDTO } from '@common/dto';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDTO, CategoryUpdateDTO } from './dto';

@Controller('category')
@ApiTags('Category')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal error',
  type: ResponseErrorDTO,
})
@ApiResponse({
  status: HttpStatus.CONFLICT,
  description: 'Conflict',
  type: ResponseErrorDTO,
})
@UseInterceptors(ResponseInterceptor)
export class CategoryController {
  constructor(
    @Inject(UsecaseProxyModule.ADD_CATEGORY_USECASE_PROXY)
    private readonly addCategoryUsecaseProxy: UseCaseProxy<AddCategoryUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_CATEGORY_USECASE_PROXY)
    private readonly getAllCategoriesUsecaseProxy: UseCaseProxy<GetAllCategoriesUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE__DATA_CATEGORY_USECASE_PROXY)
    private readonly putUpdateDataCategoryUsecaseProxy: UseCaseProxy<PutUpdateDataCategoryUseCase>,
    @Inject(UsecaseProxyModule.DELETE_CATEGORY_USECASE_PROXY)
    private readonly deleteCategoryUsecaseProxy: UseCaseProxy<DeleteCategoryUseCase>,
  ) {}

  @Post('add')
  @ApiBody({ type: CategoryDTO })
  @ApiOperation({ summary: 'Add new category' })
  @HttpCode(HttpStatus.CREATED)
  async addCategory(@Body() categoryDTO: CategoryDTO) {
    const response = await this.addCategoryUsecaseProxy
      .getInstance()
      .execute(categoryDTO);
    return response;
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all categories' })
  @HttpCode(HttpStatus.OK)
  async getAllCategories() {
    const response = await this.getAllCategoriesUsecaseProxy
      .getInstance()
      .execute();
    return response;
  }
  @Put('update')
  @ApiBody({ type: CategoryUpdateDTO })
  @ApiOperation({ summary: 'Update category' })
  @HttpCode(HttpStatus.OK)
  async updateCategory(@Body() categoryDTO: CategoryUpdateDTO) {
    const response = await this.putUpdateDataCategoryUsecaseProxy
      .getInstance()
      .execute(categoryDTO);
    return response;
  }
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete category' })
  @HttpCode(HttpStatus.OK)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const response = await this.deleteCategoryUsecaseProxy
      .getInstance()
      .execute(id);
    return response;
  }
}
