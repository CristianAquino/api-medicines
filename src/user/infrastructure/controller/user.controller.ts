import { Roles } from '@common/decorators/roles.decorator';
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
  ParseUUIDPipe,
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
import {
  AddUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  PutUpdateDataUserUseCase,
} from '@user/usecases';
import {
  AddUserDTO,
  FindAllUsersDTO,
  SWGReturnAllUserData,
  SWGReturnUserData,
  UpdateDataByUserDTO,
} from './dto';
import { Role } from './enum/user.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
@ApiCookieAuth()
@ApiTags('User')
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
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.ADD_USER_USECASE_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCase>,
    @Inject(UsecaseProxyModule.DELETE_USER_USECASE_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USECASE_PROXY)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<GetAllUsersUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY)
    private readonly putUpdateDataUserUsecaseProxy: UseCaseProxy<PutUpdateDataUserUseCase>,
  ) {}

  @Post('/add')
  @Roles(Role.ADMIN)
  @ApiBody({ type: AddUserDTO })
  @ApiOperation({ summary: 'Add new user' })
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() addUser: AddUserDTO) {
    const response = await this.addUserUsecaseProxy
      .getInstance()
      .execute(addUser);
    return response;
  }

  @Get('/all')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users by user name' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGReturnAllUserData })
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() findAllUsersByUsernameDTO: FindAllUsersDTO) {
    const response = await this.getAllUsersUsecaseProxy
      .getInstance()
      .execute(findAllUsersByUsernameDTO);
    return response;
  }
  @Put('/update')
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SWGReturnUserData })
  @ApiBody({ type: UpdateDataByUserDTO })
  @HttpCode(HttpStatus.ACCEPTED)
  async putUpdateDataUser(@Body() updateDataByUserDTO: UpdateDataByUserDTO) {
    const response = await this.putUpdateDataUserUsecaseProxy
      .getInstance()
      .execute(updateDataByUserDTO);
    return response;
  }

  @Delete('/delete/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user' })
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const response = await this.deleteUserUsecaseProxy
      .getInstance()
      .execute(id);
    return response;
  }
}
