import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // @Post()
  // @ApiCreatedResponse({ type: BrandEntity })
  // create(@Body() createBrandDto: CreateBrandDto) {
  //   return this.brandsService.create(createBrandDto);
  // }

  // @Get()
  // @ApiOkResponse({ type: BrandEntity, isArray: true })
  // findAll() {
  //   return this.brandsService.findAll();
  // }

  // @Get(':id')
  // @ApiOkResponse({ type: BrandEntity })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.brandsService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiCreatedResponse({ type: BrandEntity })
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateBrandDto: UpdateBrandDto,
  // ) {
  //   return this.brandsService.update(id, updateBrandDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: BrandEntity })
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.brandsService.remove(id);
  // }
}
