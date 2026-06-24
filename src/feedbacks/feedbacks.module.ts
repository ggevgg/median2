import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  imports: [PrismaModule, TelegramModule],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
