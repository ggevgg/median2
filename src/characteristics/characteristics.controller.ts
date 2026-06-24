import { Controller, Get, Param } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('characteristics')
@ApiTags('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Get('byCategory/:category')
  async findAll(@Param('category') category: string) {
    const characteristics = await this.characteristicsService.findAllByCategory(
      category,
    );
    return characteristics.reduce((acc, { name, value }) => {
      acc[name] = acc[name] || [];
      if (!acc[name].includes(value)) {
        acc[name].push(value);
      }
      return acc;
    }, {});
  }
}
