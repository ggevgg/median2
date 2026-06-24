import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ProductFullEntity extends ProductEntity {
  @ApiProperty()
  amount: number;
}

export class OrdersEntity implements Order {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: ProductFullEntity, isArray: true })
  products: ProductFullEntity[];
}
