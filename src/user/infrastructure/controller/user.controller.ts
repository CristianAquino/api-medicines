import { Roles } from '@common/decorators';
import { ResponseErrorDTO, SWGMessage } from '@common/dto';
import { UserModel } from '@common/entities/models';
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
  Req,
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
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  PutUpdateDataUserByAdminUseCase,
  PutUpdateDataUserUseCase,
  PutUpdatePasswordUserUseCase,
} from '@user/usecases';
import { Request } from 'express';
import {
  CreateUserDTO,
  FindAllUsersDTO,
  SWGAllUsersData,
  UpdateDataByUserDTO,
  UpdateDataUserByAdminDTO,
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
    @Inject(UsecaseProxyModule.CREATE_USER_USECASE_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
    @Inject(UsecaseProxyModule.DELETE_USER_USECASE_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USECASE_PROXY)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<GetAllUsersUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY)
    private readonly putUpdateDataUserUsecaseProxy: UseCaseProxy<PutUpdateDataUserUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE_DATA_USER_BY_ADMIN_USECASE_PROXY)
    private readonly putUpdateDataUserByAdminUsecaseProxy: UseCaseProxy<PutUpdateDataUserByAdminUseCase>,
    @Inject(UsecaseProxyModule.PUT_UPDATE_PASSWORD_USER_USECASE_PROXY)
    private readonly putUpdatePasswordUserUsecaseProxy: UseCaseProxy<PutUpdatePasswordUserUseCase>,
  ) {}

  @Post('create')
  @Roles(Role.ADMIN)
  @ApiBody({ type: CreateUserDTO })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SWGMessage })
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() addUser: CreateUserDTO) {
    const response = await this.createUserUsecaseProxy
      .getInstance()
      .execute(addUser);
    return response;
  }
  @Get('all')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGAllUsersData })
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() findAllUsersByUsernameDTO: FindAllUsersDTO) {
    const response = await this.getAllUsersUsecaseProxy
      .getInstance()
      .execute(findAllUsersByUsernameDTO);
    return response;
  }
  @Put('update-user')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SWGMessage })
  @ApiBody({ type: UpdateDataByUserDTO })
  @HttpCode(HttpStatus.ACCEPTED)
  async putUpdateDataUser(
    @Req() request: Request,
    @Body() updateDataByUserDTO: UpdateDataByUserDTO,
  ) {
    const user = request.user as UserModel;
    const response = await this.putUpdateDataUserUsecaseProxy
      .getInstance()
      .execute({ ...updateDataByUserDTO, id: user.id });
    return response;
  }
  @Put('update-admin')
  @Roles(Role.ADMIN)
  @ApiBody({ type: UpdateDataUserByAdminDTO })
  @ApiOperation({ summary: 'Update user data by admin' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SWGMessage })
  @HttpCode(HttpStatus.ACCEPTED)
  async putUpdateDataUserByAdmin(
    @Body() updateDataUserByAdminDTO: UpdateDataUserByAdminDTO,
  ) {
    const response = await this.putUpdateDataUserByAdminUsecaseProxy
      .getInstance()
      .execute(updateDataUserByAdminDTO);
    return response;
  }
  @Post('generate-key')
  @ApiOperation({ summary: 'generate key for update password user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SWGMessage })
  @HttpCode(HttpStatus.CREATED)
  async generateKey(@Req() request: Request) {
    const user = request.user as UserModel;
    const response = await this.putUpdatePasswordUserUsecaseProxy
      .getInstance()
      .getKeyWithJwtToken({
        id: user.id,
        role: user.role,
        available: user.available,
      });
    return response;
  }
  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGMessage })
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const response = await this.deleteUserUsecaseProxy
      .getInstance()
      .execute(id);
    return response;
  }
}
