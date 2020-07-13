import { config } from 'dotenv';

import { BotConfig } from '../types/types';

config(); // Carregar variáveis ambiente

const botConfig: BotConfig = {
  name: 'StatsBot',
  version: '1.1.1',
  defaultPrefix: '.',
  token: process.env.TOKEN,
  // Padrão true (Se for undefined)
  enable: process.env.ENABLE_BOT === 'false' ? false : true,

  server: {
    // Padrão false (Se for undefined)
    enable: process.env.ENABLE_SERVER === 'true',
    port: process.env.PORT || 3333
  },
  
  devlopment: {
    // Padrão false (Se for undefined)
    enable: process.env.DEVELOPMENT === 'true',
    token: process.env.DEV_TOKEN,
    enableBot: true,
    enableServer: false,
  }
};

if (botConfig.devlopment.enable) console.warn('⚠ Modo de desenvolvimento! ⚠');

export const serverConfig = botConfig.server;

export default botConfig;
