import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from '@prisma/client';

export class FeedbackEntity implements Feedback {
  constructor(partial: Partial<FeedbackEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: number | null;
}
