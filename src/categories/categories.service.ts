import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(name: string) {
    return this.prisma.category.findUnique({ where: { name } });
  }

  findOrCreateOneByName(name: string) {
    return this.prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  update(name: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { name },
      data: updateCategoryDto,
    });
  }

  remove(name: string) {
    return this.prisma.category.delete({ where: { name } });
  }
}
