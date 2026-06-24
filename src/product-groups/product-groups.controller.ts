import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductGroupEntity } from './entities/product-group.entity';
import {
  transformProductGroup,
  updateProductGroupsImageResponse,
} from './product-groups.helpers';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/auth/guards/role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('product-groups')
@ApiTags('productGroups')
export class ProductGroupsController {
  constructor(private readonly productGroupsService: ProductGroupsService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createWithProducts(
    @Body()
    body: CreateProductGroupDto,
  ) {
    const result = await this.productGroupsService.create(body);
    return transformProductGroup(result);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async updateWithProducts(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateProductGroupDto,
  ) {
    const result = await this.productGroupsService.update(id, body);
    return transformProductGroup(result);
  }

  @Get()
  @ApiOkResponse({ type: ProductGroupEntity, isArray: true })
  @ApiQuery({ name: 'category', type: String, required: false })
  @ApiQuery({ name: 'model', type: String, required: false })
  @ApiQuery({ name: 'onlyInStock', type: Boolean, required: false })
  async findAllWithProducts(
    @Query('category') category?: string,
    @Query('model') model?: string,
    @Query('onlyInStock') onlyInStock?: string,
  ) {
    const result = await this.productGroupsService.findAll(
      category,
      model,
      onlyInStock,
    );
    return updateProductGroupsImageResponse(result);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductGroupEntity })
  @ApiParam({ name: 'id', type: Number, required: true })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productGroupsService.findOne(id);
    return transformProductGroup(result);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productGroupsService.remove(id);
  }
}
