import { ResponseErrorDTO, SWGMessage } from '@common/dto';
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
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  PutUpdateDataProductUseCase,
} from '@product/usecases';
import {
  AddProductDTO,
  FindAllProductsDTO,
  SWGAllProductData,
  UpdateProductDTO,
} from './dto';

@Controller('product')
@ApiTags('Product')
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
export class ProductController {
  constructor(
    @Inject(UsecaseProxyModule.ADD_PRODUCT_USECASE_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_PRODUCTS_USECASE_PROXY)
    private readonly getAllProductsUsecaseProxy: UseCaseProxy<GetAllProductsUseCase>,
    @Inject(UsecaseProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY)
    private readonly deleteProductByIdUsecaseProxy: UseCaseProxy<DeleteProductUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE_DATA_PRODUCT_USECASE_PROXY)
    private readonly putUpdateDataProductUsecaseProxy: UseCaseProxy<PutUpdateDataProductUseCase>,
  ) {}

  @Post('add')
  @ApiBody({ type: AddProductDTO })
  @ApiOperation({ summary: 'Add new product' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SWGMessage })
  @HttpCode(HttpStatus.CREATED)
  async addProduct(@Body() productDTO: AddProductDTO) {
    const response = await this.addProductUsecaseProxy
      .getInstance()
      .execute(productDTO);
    return response;
  }
  @Get('all')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGAllProductData })
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@Query() findAllProductsDTO: FindAllProductsDTO) {
    const response = await this.getAllProductsUsecaseProxy
      .getInstance()
      .execute(findAllProductsDTO);
    return response;
  }
  @Put('update')
  @ApiBody({ type: UpdateProductDTO })
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO) {
    const response = await this.putUpdateDataProductUsecaseProxy
      .getInstance()
      .execute(updateProductDTO);
    return response;
  }
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    const response = await this.deleteProductByIdUsecaseProxy
      .getInstance()
      .execute(id);
    return response;
  }
}
