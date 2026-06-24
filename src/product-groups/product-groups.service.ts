import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Brand, Category, OrderProducts, Product } from '@prisma/client';
import { productGroupResponseConfig } from './product-groups.helpers';

@Injectable()
export class ProductGroupsService {
  constructor(
    private prisma: PrismaService,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  public async findAll(
    category?: string,
    productGroupName?: string,
    onlyInStock?: string,
  ) {
    return this.prisma.productGroup.findMany({
      where: {
        ...(productGroupName && { title: productGroupName }),
        category: {
          ...(category && { name: category }),
        },
        ...(onlyInStock !== undefined && {
          products: {
            every: {
              isInStock: onlyInStock === 'true',
            },
          },
        }),
      },
      select: productGroupResponseConfig,
    });
  }

  public async findOne(id: number) {
    return this.prisma.productGroup.findUnique({
      where: { id },
      select: productGroupResponseConfig,
    });
  }

  public remove(id: number) {
    return this.prisma.productGroup.delete({ where: { id } });
  }

  public create(data: CreateProductGroupDto) {
    return this.prisma.$transaction(async () => {
      const [brand, category, ...products] = await Promise.all([
        this.brandsService.findOrCreateOneByName(data.brand),
        this.categoriesService.findOrCreateOneByName(data.category),
        ...this.updateOrCreateProducts(
          data.products.map((product) => ({ ...product, id: undefined })),
        ),
      ]);
      console.log(
        '### create - brand, category, products:',
        JSON.stringify({ brand, category }, null, 2),
      );

      return this.prisma.productGroup.create({
        data: {
          title: data.title,
          description: data.description,
          descriptionShort: data.descriptionShort,
          thumbnail: data.thumbnail,
          rating: data.rating,
          brand: { connect: { name: brand.name } },
          category: { connect: { name: category.name } },
          products: {
            connect: products.map(({ id }) => ({ id })),
          },
        },
        select: productGroupResponseConfig,
      });
    });
  }

  public updateOrCreateProducts(products: CreateProductDto[]) {
    return products.map((product) =>
      this.prisma.product.upsert({
        where: {
          id: product.id || -1,
        },
        create: {
          description: product.description,
          isInStock: product.isInStock,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          thumbnail: product.thumbnail,
          images: {
            create:
              product.images?.map(({ url }) => ({
                image: { connect: { url } },
              })) || [],
          },
          characteristics: {
            create:
              product.characteristics?.map((characteristic) => ({
                name: characteristic.name,
                value: characteristic.value,
              })) || [],
          },
        },
        update: {
          description: product.description,
          isInStock: product.isInStock,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          thumbnail: product.thumbnail,
          images: {
            deleteMany: {},
            create:
              product.images?.map(({ url }) => ({
                image: { connect: { url } },
              })) || [],
          },
          characteristics: {
            deleteMany: {},
            create:
              product.characteristics?.map(({ name, value }) => ({
                name,
                value,
              })) || [],
          },
        },
      }),
    );
  }

  public update(id: number, data: CreateProductGroupDto) {
    return this.prisma.$transaction(async () => {
      const [brand, category, productsToDelete, ...products] =
        await Promise.all([
          this.brandsService.findOrCreateOneByName(data.brand),
          this.categoriesService.findOrCreateOneByName(data.category),
          this.findProductsToDelete(id, data.products),
          ...this.updateOrCreateProducts(data.products),
        ]);
      console.log(
        '### updateWithProducts - brand, category, productsToDelete, products:',
        JSON.stringify(
          { brand, category, productsToDelete, products },
          null,
          2,
        ),
      );

      return this.updateOrCreateProductGroup(
        id,
        data,
        brand,
        category,
        products,
        productsToDelete,
      );
    });
  }

  private updateOrCreateProductGroup(
    productGroupId: number,
    data: CreateProductGroupDto,
    brand: Brand,
    category: Category,
    products: Product[],
    productsToDelete: {
      id: number;
      orders: OrderProducts[];
    }[],
  ) {
    return this.prisma.productGroup.upsert({
      where: {
        id: productGroupId,
      },
      create: {
        title: data.title,
        description: data.description,
        descriptionShort: data.descriptionShort,
        thumbnail: data.thumbnail,
        rating: data.rating,
        brand: { connect: { name: brand.name } },
        category: { connect: { name: category.name } },
        products: {
          connect: products.map(({ id }) => ({ id })),
        },
      },
      update: {
        title: data.title,
        description: data.description,
        descriptionShort: data.descriptionShort,
        thumbnail: data.thumbnail,
        rating: data.rating,
        brand: { connect: { name: brand.name } },
        category: { connect: { name: category.name } },
        products: {
          deleteMany: {
            id: {
              notIn: data.products.map(({ id }) => id).filter((id) => id),
              in: productsToDelete
                .map((product) => !product.orders.length && product.id)
                .filter((id) => id),
            },
          },
          set: [],
          connect: products.map(({ id }) => ({ id })) || [],
        },
      },
      select: productGroupResponseConfig,
    });
  }

  private findProductsToDelete(
    productGroupId: number,
    products: CreateProductDto[],
  ) {
    return this.prisma.product.findMany({
      where: {
        productGroupId,
        orders: { none: {} },
        id: {
          notIn: products.map(({ id }) => id).filter((id) => id),
        },
      },
      select: {
        id: true,
        orders: true,
      },
    });
  }
}
