import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({ data: createBrandDto });
  }

  findAll() {
    return this.prisma.brand.findMany();
  }

  findOne(name: string) {
    return this.prisma.brand.findUnique({ where: { name } });
  }

  findOrCreateOneByName(name: string) {
    return this.prisma.brand.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  update(name: string, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({ where: { name }, data: updateBrandDto });
  }

  remove(name: string) {
    return this.prisma.brand.delete({ where: { name } });
  }
}
