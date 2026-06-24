import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderFullDto } from './dto/create-order.dto';
import {
  TelegramSendMessageEvents,
  TelegramService,
} from 'src/telegram/telegram.service';

const orderConfig = {
  id: true,
  name: true,
  email: true,
  phone: true,
  products: {
    select: {
      amount: true,
      product: {
        select: {
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
          productGroup: {
            select: {
              title: true,
              descriptionShort: true,
              thumbnail: true,
            },
          },
        },
      },
    },
  },
};

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private telegram: TelegramService,
  ) {}

  findMany(where = {}) {
    return this.prisma.order.findMany({
      where,
      select: orderConfig,
    });
  }

  async create({ userId, products, userInfo }: CreateOrderFullDto) {
    const { email, name, phone } = userId
      ? await this.prisma.user.findUnique({
          where: {
            id: +userId,
          },
        })
      : userInfo;
    const result = await this.prisma.order.create({
      data: {
        ...(userId && {
          user: {
            connect: {
              id: +userId,
            },
          },
        }),
        email,
        name,
        phone,
        products: {
          create: products.map(({ amount, productId }) => ({
            amount,
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
      select: orderConfig,
    });

    this.telegram.sendMessage({
      type: TelegramSendMessageEvents.order,
      body: result,
    });
    return result;
  }
}
