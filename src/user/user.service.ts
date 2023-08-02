import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagesHelper } from './helpers/messages.helper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findById(id: string): Promise<User> {
    const existsUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }
    const user = {
      ...existsUser,
      password: undefined,
    };
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const existsUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_EMAIL_NOT_FOUND);
    }
    const user = {
      ...existsUser,
      password: undefined,
    };
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existsUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    const existsUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existsUser) {
      throw new BadRequestException(MessagesHelper.USER_ID_NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: { id },
    });
    return `Esta ação removeu a #${id} user`;
  }
}
