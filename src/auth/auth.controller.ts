import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guards';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SignupEntity } from './entity/signup.entity';
import { LoginEntity } from './entity/login.entity';
import { jwtConstants } from './auth.constants';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({ type: LoginEntity })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: SignupEntity })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async createUser(@Body() signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(
      signupDto.password,
      jwtConstants.saltOrRounds,
    );
    const user = await this.usersService.createUser({
      ...signupDto,
      password: hashedPassword,
    });
    console.log('@@ user', user);
    const result = await this.authService.login({
      email: signupDto.email,
      password: signupDto.password,
    });
    console.log('@@@ result', result);
    return result;
  }
}
