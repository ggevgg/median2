// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupEntity } from 'src/auth/entity/signup.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    phone: string;
  }): Promise<SignupEntity> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
      },
    });
  }

  async getUser(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
