import { BotEvent } from "../types/types";
import { Channel } from "discord.js";

import db from '../database/Connection';

const event: BotEvent = {
  name: 'ChannelDelete',
  description: 'Evento chamado quando um canal é deletado',
  caller: 'channelDelete',
  enable: true,
  run: async (Bot, channel: Channel) => {
    // Verificar se é canal de texto ou voz
    if (!['text', 'voice'].includes(channel.type)) return;

    // Deletar dados do canal
    await db('text_channels').where('id', '=', channel.id).delete();
    await db('messages').where('channel_id', '=', channel.id).delete();
    await db('users_active').where('channel_id', '=', channel.id).delete();
    await db('voice_channels').where('id', '=', channel.id).delete();
  },
};

export default event;