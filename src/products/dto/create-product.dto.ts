import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CharacteristicsEntity } from 'src/characteristics/entities/characteristics.entity';
import { ImagesEntity } from 'src/images/entities/images.entity';

export class CreateProductDto {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  discountPercentage: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  stock?: number = 0;

  @IsString()
  @IsOptional()
  @ApiProperty()
  thumbnail: string = null;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  isInStock?: boolean = true;

  @IsOptional()
  @ApiProperty({ type: CharacteristicsEntity, isArray: true })
  characteristics: CharacteristicsEntity[];

  @IsOptional()
  @ApiProperty({ type: ImagesEntity, isArray: true })
  images: ImagesEntity[];

  @IsOptional()
  @ApiProperty()
  id?: number;
}
