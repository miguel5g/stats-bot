import botConfig from './config/BotConfig';
import { config } from 'dotenv';

config(); // Carregar variáveis ambiente


if (botConfig.enable) {
  console.log('⚠ Bot ativado');
  import('./Bot');
};

if (botConfig.server.enable) {
  console.log('⚠ Server ativado');
  import('./server/Server');
};
