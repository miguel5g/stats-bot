import { BotEvent } from "../types/types";

const event: BotEvent = {
  name: 'Ready',
  description: 'Evento chamado quando o Bot inicia',
  caller: 'ready',
  enable: true,
  run: (Bot) => {
    Bot.startTime = Date.now(); // Salvar timestamp do horario que o bot iniciou
    
    console.log(`Bot iniciado com ${Bot.users.cache.size} usuários, ${Bot.channels.cache.size} canais e ${Bot.guilds.cache.size} servidores!`);
  },
};

export default event;