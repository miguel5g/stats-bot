import { Command } from '../../types/types';

const command: Command = {
  name: 'a',
  description: 'a',
  usage: 'd',
  dm: false,
  enable: true,
  run: (Bot, msg, args) => {
    return msg.reply('a');
  },
};

export default command;