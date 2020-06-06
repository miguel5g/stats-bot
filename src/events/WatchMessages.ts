import { Message } from 'discord.js';

import { BotEvent, GuildData, MessageData, UserData, ChannelData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'Message',
  description: 'Evento chamado quando alguém envia uma messagem',
  caller: 'message',
  enable: true,
  run: async (Bot, msg: Message) => {
    // Verificar se foi um bot que enviou
    if (msg.author.bot) return;

    // Verificar se foi enviado em dm
    if (msg.channel.type === 'dm') return;

    // Verificar se foi um comando
    let guildData: GuildData = await db('guilds')
      .select('*')
      .where('id', '=', msg.guild?.id || 'default')
      .first();

    // Gerar um erro se não existir no banco de dados
    if (!guildData) return console.error(new Error('Guild not found in database'));

    // Verificar se inicia com a prefix do servidor
    if (msg.content.startsWith(guildData.prefix)) return;

    const message: MessageData = {
      id: msg.id,
      guild_id: msg.guild?.id || 'default',
      channel_id: msg.channel.id,
      user_id: msg.author.id,
      created_at: Date.now(),
    };

    await db('messages').insert(message);

    const userData = await db('users').select('*').where('id', '=', msg.author.id);

    if (!userData) {
      const user: UserData = {
        id: msg.author.id,
        username: msg.author.username,
      };

      await db('users').insert(user);
    }

    const lastChannelUpdate = Bot.channelsUpdates.get(msg.channel.id);

    if (!lastChannelUpdate || Date.now() - lastChannelUpdate > 120 * 1000) {
      const channelData: ChannelData = {
        id: msg.channel.id,
        guild_id: msg.guild?.id || 'default',
        average: 0,
        last_update: Date.now(),
      };

      Bot.channelsUpdates.set(channelData.id, channelData.last_update);

      const lastMessages: MessageData[] = await db('messages')
        .select('*')
        .where('guild_id', '=', channelData.guild_id)
        .where('channel_id', '=', channelData.id)
        .where('created_at', '>=', Date.now() - (60 * 60 * 1000))
        .distinct();

      channelData.average = lastMessages.length / 60;

      if (!lastChannelUpdate) {
        await db('channels').insert(channelData);
      } else {
        await db('channels').update(channelData);
      }
    };
  },
};

export default event;