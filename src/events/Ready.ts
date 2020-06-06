import { BotEvent } from "../types/types";

const event: BotEvent = {
  name: 'Ready',
  description: '',
  caller: 'ready',
  run: (Bot) => {
    Bot.startTime = Date.now(); // Salvar timestamp do horario que o bot iniciou
    console.log('pronto')
  },
};

export default event;