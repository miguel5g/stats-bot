import { MessageEmbed } from 'discord.js';
// @ts-ignore Modúlo não exporta tipos
import timeToDate from 'timestamp-to-date';

import { Command, GuildData } from '../../types/types';
import db from '../../database/Connection';

const command: Command = {
  name: 'stats',
  description: 'Ver estátisticas do servidor',
  usage: '<prefix>stats',
  aliases: ['s'],
  dm: false,
  enable: true,
  run: async (Bot, msg) => {

    const description = `
    Aqui você poderá ver as \`📊\`estatísticas do seu servidor
    Lembrando que elas são colhidas a todo momento, porém são atualizadas a cada \`🕐35min\`!
    `;

    const guildData: GuildData = await db('guilds')
      .select('*')
      .where('id', '=', msg.guild?.id || 'default')
      .first();

    const guildValues = `
    **Servidor criado em:** \`${timeToDate(msg.guild?.createdTimestamp, 'dd/MM/yyyy HH:mm:ss')}\`
    **Quantidade de membros:** \`${Bot.users.cache.size}\`
    **Id do servidor:** \`${msg.guild?.id}\`
    **Quantidade de canais de texto:** \`${msg.guild?.channels.cache.filter(channel => channel.type !== 'voice').size}\`
    **Quantidade de canais de voz:** \`${msg.guild?.channels.cache.filter(channel => channel.type === 'voice').size}\`
    **Mensagens por hora:**
    `;

    const channelsValues = `
    **Canal de texto mais usado:** ${(guildData.best_t_channel ? `<#${guildData.best_t_channel}>` : '\`Nenhum\`')}
    **Canal de texto menos usado:** ${(guildData.worse_t_channel ? `<#${guildData.worse_t_channel}>` : '\`Nenhum\`')}
    **Canal de voz mais usado:** ${(guildData.best_v_channel ? `<#${guildData.best_v_channel}>` : '\`Nenhum\`')}
    **Canal de voz menos usado:** ${(guildData.worse_v_channel ? `<#${guildData.worse_v_channel}>` : '\`Nenhum\`')}
    `;

    const usersValues = `
    **Membro mais ativo:**
    **Membro menos ativo:**
    **Récem chegados(24h):** \`${guildData.joined_amount}\`
    **Sairam(24h):** \`${guildData.quited_amount}\`
    `;

    // Criar cada fild com os valores
    const filds = [
      { name: '**Servidor**', value: guildValues },
      { name: '**Canais**', value: channelsValues },
      { name: '**Usuários**', value: usersValues },
    ];

    // Embed que vai conter tudo
    const dataEmbed = new MessageEmbed()
      .setColor('#00ffff')
      .setTitle(`${msg.guild?.name} -  Estatísticas`)
      .setDescription(description)
      .setTimestamp(guildData.last_update)
      .setFooter(`${msg.author.tag} • Última vez atualizado`, msg.author.avatarURL() || undefined)

    if (msg.guild?.icon) {
      dataEmbed.setThumbnail(msg.guild.iconURL() || 'default');
    }
    // Adicionar os filds no embed
    filds.map(({ name, value }) => {
      dataEmbed.addField(name, value);
    });

    msg.channel.send(dataEmbed);
  },
};

export default command;