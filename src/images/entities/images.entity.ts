import { ApiProperty } from '@nestjs/swagger';
import { Image } from '@prisma/client';

export class ImagesEntity implements Image {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  url: string;

  @ApiProperty()
  productId: number;
}
