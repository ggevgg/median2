import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  createMany(data: CreateImageDto[]) {
    return this.prisma.$transaction(
      data.map((item) => this.prisma.image.create({ data: item })),
    );
  }

  getImageList() {
    return this.prisma.image.findMany();
  }

  disconnectManyByIds(ids: number[]) {
    // return this.prisma.imageProducts
  }
}
