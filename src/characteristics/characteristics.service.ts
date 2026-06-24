import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharacteristicsService {
  constructor(private prisma: PrismaService) {}

  findAllByCategory(category: string) {
    return this.prisma.characteristics.findMany({
      where: {
        product: {
          is: {
            productGroup: {
              is: {
                category: {
                  is: {
                    name: category,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
