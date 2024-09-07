import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  PutUpdateDataCategoryUseCase,
} from '@category/usecases';
import { Roles } from '@common/decorators';
import { ResponseErrorDTO } from '@common/dto';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SWGMessage } from '@user/infrastructure/controller/dto';
import { Role } from '@user/infrastructure/controller/enum/user.enum';
import {
  CategoryDTO,
  CategoryQueryDTO,
  CategoryUpdateDTO,
  SWGAllCategoryData,
} from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
@ApiTags('Category')
@ApiCookieAuth()
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
export class CategoryController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_CATEGORY_USECASE_PROXY)
    private readonly createCategoryUsecaseProxy: UseCaseProxy<CreateCategoryUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_CATEGORY_USECASE_PROXY)
    private readonly getAllCategoriesUsecaseProxy: UseCaseProxy<GetAllCategoriesUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE__DATA_CATEGORY_USECASE_PROXY)
    private readonly putUpdateDataCategoryUsecaseProxy: UseCaseProxy<PutUpdateDataCategoryUseCase>,
    @Inject(UsecaseProxyModule.DELETE_CATEGORY_USECASE_PROXY)
    private readonly deleteCategoryUsecaseProxy: UseCaseProxy<DeleteCategoryUseCase>,
  ) {}

  @Post('create')
  @Roles(Role.ADMIN)
  @ApiBody({ type: CategoryDTO })
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SWGMessage })
  @HttpCode(HttpStatus.CREATED)
  async addCategory(@Body() categoryDTO: CategoryDTO) {
    const response = await this.createCategoryUsecaseProxy
      .getInstance()
      .execute(categoryDTO);
    return response;
  }
  @Get('all')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGAllCategoryData })
  @HttpCode(HttpStatus.OK)
  async getAllCategories(@Query() category: CategoryQueryDTO) {
    const response = await this.getAllCategoriesUsecaseProxy
      .getInstance()
      .execute(category.category);
    return response;
  }
  @Put('update')
  @Roles(Role.ADMIN)
  @ApiBody({ type: CategoryUpdateDTO })
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async updateCategory(@Body() categoryDTO: CategoryUpdateDTO) {
    const response = await this.putUpdateDataCategoryUsecaseProxy
      .getInstance()
      .execute(categoryDTO);
    return response;
  }
  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const response = await this.deleteCategoryUsecaseProxy
      .getInstance()
      .execute(id);
    return response;
  }
}
