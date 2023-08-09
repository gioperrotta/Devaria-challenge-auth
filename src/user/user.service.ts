import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MessagesHelper } from './helpers/messages.helper';
import { RoleService } from 'src/role/role.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserWithRole } from './entities/UserWithRole.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  async isAuthorizationUser(
    urerRequestId: string,
    roleNewUserLevel: number,
  ): Promise<boolean> {
    const userRequest = await this.prisma.user.findUnique({
      where: {
        id: urerRequestId,
      },
      include: { role: true },
    });
    if (userRequest.role.level === 0) {
      return true;
    } else if (userRequest.role.level === 1 && roleNewUserLevel <= 1) {
      return false;
    }
    return true;
  }

  async create(userId: string, createUserDto: CreateUserDto): Promise<User> {
    const existsRole = await this.roleService.findById(createUserDto.roleId);

    if (!this.isAuthorizationUser(userId, existsRole.level)) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED_CREATE);
    }

    const existsUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existsUser) {
      throw new BadRequestException(MessagesHelper.USER_EMAIL_EXISTS);
    }

    const passwordHashed = await hash(createUserDto.password, 6);
    const newUser = {
      ...createUserDto,
      password: passwordHashed,
    };

    const createdUser = await this.prisma.user.create({ data: newUser });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    const usersWithoutPassword = users.map((u) => {
      return { ...u, password: undefined };
    });
    return usersWithoutPassword;
  }

  async findById(userId: string): Promise<UserWithRole> {
    const existsUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }
    return {
      ...existsUser,
      password: undefined,
    };
  }

  async findByEmail(email: string): Promise<User> {
    const existsUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_EMAIL_NOT_FOUND);
    }

    return {
      ...existsUser,
      password: undefined,
    };
  }

  async update(userId: string, id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email || updateUserDto.password) {
      throw new BadRequestException(
        MessagesHelper.USER_UPDATE_NOT_PASSWORD_OR_EMAIL,
      );
    }
    const existsUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }

    if (updateUserDto.roleId) {
      const existsRole = await this.roleService.findById(updateUserDto.roleId);
      if (!this.isAuthorizationUser(userId, existsRole.level)) {
        throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED_UPDATE);
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async remove(userId: string, id: string): Promise<string> {
    const existsUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }

    const userToDelete = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: { role: true },
    });

    if (!this.isAuthorizationUser(userId, userToDelete.role.level)) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED_DELETE);
    }

    await this.prisma.user.delete({
      where: { id },
    });
    return `Esta ação removeu a #${id} user`;
  }

  async changePassword(
    userId: string,
    { password, newPassword }: ChangePasswordDto,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const MatchesPassword = await compare(password, user.password);
    if (!MatchesPassword) {
      throw new BadRequestException(
        MessagesHelper.USER_UPDATE_PASSWORD_NOT_MATCH,
      );
    }
    const newPasswordHashed = await hash(newPassword, 6);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHashed },
    });

    return MessagesHelper.USER_PASSWORD_UPDATE_SUCCESS;
  }
}
