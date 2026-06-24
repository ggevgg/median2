import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersEntity } from './entities/orders.entity';
import { CreateOrderFullDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Role } from 'src/auth/guards/role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOkResponse({ type: OrdersEntity, isArray: true })
  findAll() {
    return this.ordersService.findMany();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOkResponse({ type: OrdersEntity, isArray: true })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findMany({
      id,
    });
  }

  @Post()
  @ApiOkResponse({ type: OrdersEntity, isArray: true })
  create(
    @Body()
    body: CreateOrderFullDto,
  ) {
    return this.ordersService.create(body);
  }
}
