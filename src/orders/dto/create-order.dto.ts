import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  // @IsNumber()
  // @ApiProperty()
  // user: CreateUserDto;
  // @ApiProperty({ type: CreateProductWithCharacteristicsDto, isArray: true })
  // products: CreateProductWithCharacteristicsDto[];
}

export class ProductDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @ApiProperty()
  productId: number;
}

export class UserInfoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone: string;
}

export class CreateOrderFullDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userId?: number;

  @ApiProperty()
  userInfo?: UserInfoDto;

  @ApiProperty({ type: ProductDto, isArray: true })
  products: ProductDto[];
}
