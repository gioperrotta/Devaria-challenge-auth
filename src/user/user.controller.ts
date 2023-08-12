import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserFromJwt } from 'src/auth/types/UserFromJwt';
import { AccessRolesGuard } from 'src/auth/guards/roleAccess.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role/types/role.enum';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseGuards(AccessRolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(
    @CurrentUser() user: UserFromJwt,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(user.id, createUserDto);
  }

  @Get('me')
  GetMe(@CurrentUser() user: UserFromJwt) {
    return this.userService.findById(user.id);
  }

  @Roles(Role.Admin, Role.Manager)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('by-email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch('/change-password')
  changePassword(
    @CurrentUser() user: UserFromJwt,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(user.id, changePasswordDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Patch(':id')
  update(
    @CurrentUser() user: UserFromJwt,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.id, id, updateUserDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Delete(':id')
  @Roles(Role.Admin)
  delete(@CurrentUser() user: UserFromJwt, @Param('id') id: string) {
    return this.userService.remove(user.id, id);
  }
}
