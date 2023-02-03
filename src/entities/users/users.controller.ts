import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  // Module,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import errorMessages from '../../constants/errorMessages';
import { UpdateUserDto } from './dto/update-user.dto';
import { DB } from '../../db/DB';

@Controller('user')
export class UserController {
  constructor(private readonly db: DB) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return this.db.users.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor, NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.db.users.findById(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.db.users.create(new CreateUserDto(createUserDto));
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor, NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { newPassword, oldPassword }: UpdatePasswordDto,
  ) {
    const user = this.db.users.findById(id);

    if (!user) return;

    if (user.password !== oldPassword) {
      throw new HttpException(
        errorMessages.incorrectPassword,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.db.users.update(id, new UpdateUserDto(user, newPassword));
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.db.users.findById(id);

    if (!user) return;

    this.db.users.remove(id);

    return '';
  }
}
