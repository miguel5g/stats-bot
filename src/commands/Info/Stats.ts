import { MessageEmbed } from 'discord.js';
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
    **Quantidade de membros:** ${Bot.users.cache.size}
    `;

    const bestTChanel = (guildData.best_t_channel ?
      `<#${guildData.best_t_channel}>`
      /* msg.guild?.channels.cache.get(guildData.best_t_channel) */
      :
      'Nenhum'
    );

    const bestVChanel = (guildData.best_v_channel ?
      msg.guild?.channels.cache.get(guildData.best_v_channel)
      :
      'Nenhum'
    );

    const channelsValues = `
    **Canal de texto mais usado:** ${bestTChanel}
    **Canal de texto menos usado:**
    **Canal de voz mais usado:** ${bestVChanel}
    **Canal de voz menos usado:**
    `;

    const usersValues = `
    **Récem chegados(24h):** ${guildData.joined_amount}
    **Sairam(24h):** ${guildData.quited_amount}
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