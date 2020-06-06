import { config } from 'dotenv';

config(); // Carregar variáveis ambiente

export interface BotConfig {
  name: string,
  version: string,
  defaultPrefix: string,
  token: string | undefined,
  enable: boolean,

  server: {
    enable: boolean,
  },

  devlopment: {
    enable: boolean,
    token: string | undefined,
    enableBot: boolean,
    enableServer: boolean,
  },
};

const botConfig: BotConfig = {
  name: 'StatsBot',
  version: '1.0-Beta',
  defaultPrefix: '.',
  token: process.env.TOKEN,
  enable: process.env.ENABLE_BOT === 'true',

  server: {
    enable: process.env.ENABLE_SERVER === 'true',
  },

  devlopment: {
    enable: Boolean(process.env.DEVELOPMENT) || true,
    token: process.env.DEV_TOKEN,
    enableBot: true,
    enableServer: false,
  }
};

if (botConfig.devlopment.enable) console.warn('⚠ Modo de desenvolvimento! ⚠');

export default botConfig;
