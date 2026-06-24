import { ApiProperty } from '@nestjs/swagger';

export class BrandResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}

export class CategoryResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}

export class CharacteristicResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class ImagesEntityResponse {
  @ApiProperty()
  image: {
    url: string;
  };
}

export class ImagesEntityNormalisedResponse {
  @ApiProperty()
  url: string;
}

export class ProductEntityResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discountPercentage: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  isInStock: boolean;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty({
    type: ImagesEntityNormalisedResponse,
    isArray: true,
  })
  images: ImagesEntityResponse[] | ImagesEntityNormalisedResponse[];

  @ApiProperty({ type: CharacteristicResponse, isArray: true })
  characteristics: CharacteristicResponse[];
}

export class ProductGroupEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  descriptionShort: string | null;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  rating: number;

  @ApiProperty({ required: false, type: BrandResponse })
  brand: BrandResponse;

  @ApiProperty({ required: false, type: CategoryResponse })
  category: CategoryResponse;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty({ type: ProductEntityResponse, isArray: true })
  products: ProductEntityResponse[];
}
