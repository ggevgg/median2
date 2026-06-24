import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(signInDto: LoginDto) {
    const user = await this.validateUser(signInDto);
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }

  async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.usersService.getUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
