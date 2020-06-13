import { BotEvent } from "../types/types";

const event: BotEvent = {
  name: 'VoiceUpdate',
  description: 'Evento chamado quando alguém entra no servidor',
  caller: 'voiceStateUpdate',
  enable: true,
  run: (Bot, ) => {
  },
};

export default event;