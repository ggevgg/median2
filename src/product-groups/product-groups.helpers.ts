import { ProductGroupEntity } from './entities/product-group.entity';

export const transformProductGroup = (productGroup: ProductGroupEntity) => ({
  ...productGroup,
  products: productGroup.products.map((product) => ({
    ...product,
    title: productGroup.title,
    thumbnail: product.thumbnail || productGroup.thumbnail,
    description: product.description || productGroup.description,
    descriptionShort: productGroup.descriptionShort,
    images: product.images.map((image) => ({
      url: image.image.url,
    })),
  })),
});

export const updateProductGroupsImageResponse = (
  productGroups: ProductGroupEntity[],
) => productGroups.map(transformProductGroup);

export const productGroupResponseConfig = {
  id: true,
  title: true,
  description: true,
  descriptionShort: true,
  thumbnail: true,
  rating: true,
  products: {
    select: {
      id: true,
      description: true,
      isInStock: true,
      price: true,
      discountPercentage: true,
      stock: true,
      thumbnail: true,
      characteristics: {
        select: {
          name: true,
          value: true,
        },
      },
      images: {
        select: {
          image: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  },
  category: {
    select: {
      name: true,
      description: true,
      thumbnail: true,
    },
  },
  brand: {
    select: {
      name: true,
      description: true,
      thumbnail: true,
    },
  },
};
