import { ApiProperty } from '@nestjs/swagger';
import { Characteristics } from '@prisma/client';

export class CharacteristicsEntity implements Characteristics {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
