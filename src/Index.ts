import botConfig from './config/BotConfig';
import { config } from 'dotenv';

config(); // Carregar variáveis ambiente


if (botConfig.enable) import('./Bot');

if (botConfig.server.enable) import('./server/Server');
