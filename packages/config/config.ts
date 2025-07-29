import dotenv from "dotenv";
import { findUp } from "find-up";

const dotenvPath = await findUp(".env");
dotenv.config({ path: dotenvPath });

const getErrorEnvMessage = (fieldName: string) =>
  `Вы не установили ${fieldName} поле в .env, выполните команду \`cp .env.dist .env\` и заполните поле ${fieldName}`;

export class Config {
  static get API_ID(): number {
    if (!process.env.API_ID) {
      throw new Error(getErrorEnvMessage("API_ID"));
    }

    return Number(process.env.API_ID);
  }

  static get API_HASH(): string {
    if (!process.env.API_HASH) {
      throw new Error(getErrorEnvMessage("API_HASH"));
    }

    return process.env.API_HASH;
  }

  static get PHONE_NUMBER(): string {
    if (!process.env.PHONE_NUMBER) {
      throw new Error(getErrorEnvMessage("PHONE_NUMBER"));
    }

    return process.env.PHONE_NUMBER;
  }

  static get CHANNEL_COLLECTOR(): string {
    if (!process.env.CHANNEL_COLLECTOR) {
      throw new Error(getErrorEnvMessage("CHANNEL_COLLECTOR"));
    }

    return process.env.CHANNEL_COLLECTOR;
  }

  static get CHANNELS(): string[] {
    if (!process.env.CHANNELS) {
      throw new Error(getErrorEnvMessage("CHANNELS"));
    }
    const rowChannels = process.env.CHANNELS.replace(/\\/g, '');

    const channels = JSON.parse(rowChannels || '[]') as string[];

    return channels;
  }
}
