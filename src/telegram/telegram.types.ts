export interface TelegramGetUpdatesResponse {
  ok: boolean;
  result: {
    update_id: number;
    message: {
      message_id: number;
      from: {
        id: number;
        is_bot: boolean;
        first_name: string;
        username: string;
        language_code: string;
      };
      chat: {
        id: number;
        first_name: string;
        username: string;
        type: string;
      };
      date: number;
      text: string;
      entities: {
        offset: 0;
        length: 6;
        type: string;
      }[];
    };
  }[];
}
