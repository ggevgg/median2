// src/brands/entities/brand.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '@prisma/client';

export class BrandEntity implements Brand {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}
