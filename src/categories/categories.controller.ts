import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Post()
  // @ApiCreatedResponse({ type: CategoryEntity })
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  // @Get()
  // @ApiOkResponse({ type: CategoryEntity, isArray: true })
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

  // @Get(':id')
  // @ApiOkResponse({ type: CategoryEntity })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.categoriesService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiCreatedResponse({ type: CategoryEntity })
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(id, updateCategoryDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: CategoryEntity })
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.categoriesService.remove(id);
  // }
}
