import { Client } from 'discord.js';

import { BotEvent, ChannelData, MessageData } from "../types/types";
import db from '../database/Connection';

class Data {
  private Bot: Client;

  constructor(Bot: Client) {
    this.Bot = Bot
  };

  async updateChannels() {
    const outChannels: ChannelData[] = await db('channels')
      .select('*')
      .where('last_update', '<=', Date.now() - (15 * 60 * 1000))
      .distinct();

    outChannels.map(async channelData => {
      const newChannelData: ChannelData = channelData;
      
      const lastMessages: MessageData[] = await db('messages')
      .select('*')
      .where('guild_id', '=', newChannelData.guild_id)
      .where('channel_id', '=', newChannelData.id)
      .where('created_at', '>=', Date.now() - (60 * 60 * 1000))
      .distinct();
      
      newChannelData.average = lastMessages.length / 60;
      newChannelData.msg_per_hour = lastMessages.length;
      newChannelData.last_update = Date.now();
      
      await db('channels').where('id', '=', newChannelData.id).update(newChannelData);
    });

  };
};

const event: BotEvent = {
  name: 'DataManage',
  description: 'Atualizar banco de dados',
  caller: 'ready',
  enable: true,
  run: (Bot) => {

    const dataManage = new Data(Bot);

    setInterval(() => {
      dataManage.updateChannels();
    }, 15 * 60 * 1000)

  },
};

export default event;