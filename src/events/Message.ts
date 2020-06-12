import { Message } from 'discord.js';

import { BotEvent, GuildData } from "../types/types";
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
    if (!msg.content.startsWith(guildData.prefix)) return;

    // Separar o nome do comando executado e argumentos passados
    const cmd = msg.content.split(' ')[0].slice(guildData.prefix.length);
    const args = msg.content.split(' ').slice(1).filter(arg => arg !== '');

    // Buscar tanto nome quanto aliase
    let command = Bot.commands.get(cmd);
    const aliase = Bot.aliases.get(cmd);
    // Se tiver achado aliase e não tiver achado o comando tentar buscar pela aliase
    if (!command && aliase) command = Bot.commands.get(aliase);

    // Executar o comando
    if (command) {
      // Verificar se o usuário tem permissões
      if (command.permissions) {
        if (!msg.member.hasPermission(command.permissions)) return msg.channel.send(command.noPermission || '> Você não tem permissão para isso!');
        command.run(Bot, msg, args)
      } else [
        command.run(Bot, msg, args)
      ]
    };
  },
};

export default event;