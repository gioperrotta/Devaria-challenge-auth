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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserFromJwt } from 'src/auth/types/UserFromJwt';
import { IsPublic } from 'src/auth/decorators/isPublic.decorator';
import { AccessRolesGuard } from 'src/auth/guards/roleAccess.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role/types/roleName.enum';
import { CreateUserGuard } from 'src/auth/guards/createUser.guard';

@Controller('user')
@UseGuards(AccessRolesGuard, CreateUserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  @Roles(Role.Manager)
  GetMe(@CurrentUser() user: UserFromJwt) {
    return this.userService.findById(user.id);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
