import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CharacteristicsEntity } from 'src/characteristics/entities/characteristics.entity';
import { ImagesEntity } from 'src/images/entities/images.entity';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: ImagesEntity, isArray: true })
  images: ImagesEntity[];

  @ApiProperty({ type: CharacteristicsEntity, isArray: true })
  characteristics: CharacteristicsEntity[];

  @ApiProperty()
  productGroupId: number;
}

export class ProductEntityByModel {
  [key: string]: Product[];
}
