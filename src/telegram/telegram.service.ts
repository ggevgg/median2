import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
// import { TelegramGetUpdatesResponse } from './telegram.types';

const telegramBaseUrl = 'https://api.telegram.org/bot';
const telegramToken = process.env.NEXT_TELEGRAM_TOKEN;
const telegramChatId = process.env.NEXT_TELEGRAM_CHAT_ID;

export enum TelegramSendMessageEvents {
  order = 'order',
  feedback = 'feedback',
}

export interface TelegramSendMessageEvent {
  type: TelegramSendMessageEvents;
  body: any;
}

@Injectable()
export class TelegramService {
  private chatId: string;

  constructor(private readonly httpService: HttpService) {
    this.chatId = telegramChatId;
  }

  async sendMessage(event: TelegramSendMessageEvent): Promise<object> {
    let template = '';

    if (event.type === TelegramSendMessageEvents.order) {
      const { name, email, phone, products } = event.body;

      template = `
        <b>New order from ${new Date().toDateString()}</b>
        <b>User info:</b>
          name: ${name}
          email: ${email}
          phone: ${phone}
        
        <b>Product list:</b>
          ${products.map((product) => {
            return `Title: ${product.product.productGroup.title}
          ${product.product.productGroup.descriptionShort}
          Amount: ${product.amount}
          Price: ${product.product.price}

          `;
          })}
        <b>Total sum: ${products.reduce(
          (acc: number, product) =>
            acc + product.product.price * product.amount,
          0,
        )}</b>
      `;
    } else if (event.type === TelegramSendMessageEvents.feedback) {
      const { name, lastName, email, phone, message } = event.body;

      template = `
        <b>New feedback from ${new Date().toDateString()}</b>
        <b>User info:</b>
          name: ${name} ${lastName}
          email: ${email}
          phone: ${phone}
        
        <b>Feedback:</b> ${message}`;
    }

    return this.httpService.get(
      encodeURI(
        `${telegramBaseUrl}${telegramToken}/sendMessage?chat_id=${this.chatId}&text=${template}&parse_mode=HTML`,
      ),
    );
  }
}
