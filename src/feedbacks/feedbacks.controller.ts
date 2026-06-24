import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackEntity } from './entities/feedback.entity';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from 'src/auth/guards/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('feedbacks')
@ApiTags('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  @ApiCreatedResponse({ type: FeedbackEntity })
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return new FeedbackEntity(
      await this.feedbacksService.create(createFeedbackDto),
    );
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiCreatedResponse({ type: FeedbackEntity, isArray: true })
  async findAll() {
    return this.feedbacksService.findAll();
  }
}
