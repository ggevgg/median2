import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateProductGroupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  descriptionShort?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  thumbnail: string = null;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  rating?: number = 0;

  @IsNumber()
  @ApiProperty()
  brand: string;

  @IsNumber()
  @ApiProperty()
  category: string;

  @ApiProperty({ type: CreateProductDto, isArray: true })
  products: CreateProductDto[];
}
