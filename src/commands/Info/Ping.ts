import { MessageEmbed } from 'discord.js';
import { Command } from '../../types/types';

const command: Command = {
  name: 'ping',
  description: 'Ver latência do bot e da api',
  usage: '<prefix>ping',
  aliases: ['p'],
  dm: true,
  enable: true,
  run: async (Bot, msg, args) => {
    const calcMsg = await msg.channel.send('> Carregando...');
    const latBot = calcMsg.createdTimestamp - msg.createdTimestamp;
    const latApi = Math.round(Bot.ws.ping);

    const resultEmbed = new MessageEmbed()
      .setColor('#ff6600')
      .setDescription(`Pong! :hourglass:\n**A latência é:** &1${latBot}ms&1\n**A latência da API é:** &1${latApi}ms&1`.split('&1').join('`'));

    return calcMsg.edit('', resultEmbed);
  },
};

export default command;