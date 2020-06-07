import { MessageEmbed } from 'discord.js';
import { Command } from '../../types/types';
import db from '../../database/Connection';

const command: Command = {
  name: 'stats',
  description: 'Ver estátisticas do servidor',
  usage: '<prefix>stats',
  aliases: ['s'],
  dm: false,
  enable: true,
  run: async (Bot, msg, args) => {

  },
};

export default command;