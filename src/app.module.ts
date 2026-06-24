import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { ProductGroupsModule } from './product-groups/product-groups.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    ImagesModule,
    CharacteristicsModule,
    ProductGroupsModule,
    OrdersModule,
    AuthModule,
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
