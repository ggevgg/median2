import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CharacteristicsController],
  providers: [PrismaService, CharacteristicsService],
})
export class CharacteristicsModule {}
