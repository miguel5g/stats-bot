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
    port: number,
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
    port: Number(process.env.PORT) || 3333
  },

  devlopment: {
    enable: Boolean(process.env.DEVELOPMENT) || true,
    token: process.env.DEV_TOKEN,
    enableBot: true,
    enableServer: false,
  }
};

if (botConfig.devlopment.enable) console.warn('⚠ Modo de desenvolvimento! ⚠');

const serverConfig = botConfig.server;

export { serverConfig as serverConfig };

export default botConfig;
