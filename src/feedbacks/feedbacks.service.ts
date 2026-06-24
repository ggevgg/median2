import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  TelegramSendMessageEvents,
  TelegramService,
} from 'src/telegram/telegram.service';

@Injectable()
export class FeedbacksService {
  constructor(
    private prisma: PrismaService,
    private telegram: TelegramService,
  ) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    this.telegram.sendMessage({
      type: TelegramSendMessageEvents.feedback,
      body: createFeedbackDto,
    });
    return this.prisma.feedback.create({ data: createFeedbackDto });
  }

  findAll() {
    return this.prisma.feedback.findMany();
  }
}
