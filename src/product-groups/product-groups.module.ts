import { Module } from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { ProductGroupsController } from './product-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CharacteristicsService } from 'src/characteristics/characteristics.service';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [ProductGroupsController],
  providers: [
    ProductGroupsService,
    BrandsService,
    CategoriesService,
    BrandsService,
    CategoriesService,
    CharacteristicsService,
    ImagesService,
  ],
  imports: [PrismaModule],
})
export class ProductGroupsModule {}
