const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Generate Search Links')
    .addStringOption(option=>option.setName('text').setDescription('Search that for you').setRequired(true).setMaxLength(100))
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply()
    const search = interaction.options.getString('text')
    let googleurl = 'https://google.com/search?q='
    let duckurl = 'https://duckduckgo.com/?t=h_&q='
    let ecosiaurl = 'https://www.ecosia.org/search?method=index&q='
    let braveurl = 'https://search.brave.com/search?q='
    let bingurl = 'https://www.bing.com/search?q='
    let yahoourl = 'https://search.yahoo.com/search?p='
    let qwanturl = 'https://www.qwant.com/?q='
    let swisscows = 'https://swisscows.com/it/web?query='
    let gibiru = 'https://gibiru.com/results.html?q='
    let yandex = 'https://yandex.com/search/?text='
    let lilo = 'https://search.lilo.org/?q='
    const src = search.replaceAll(' ', "+")
    googleurl = googleurl+src;
    duckurl += src;
    ecosiaurl += src;
    braveurl += src;
    bingurl += src;
    yahoourl += src;
    qwanturl += src;
    swisscows += src;
    gibiru += src;
    yandex += src;
    lilo += src;
    const embed = new EmbedBuilder()
      .setColor(0x00ffff)
      .setAuthor({ name: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}` })
      .setTitle('Search Links')
      .setDescription(`- <:google:1266016555662184606> [${search}](${googleurl}) • Google \n- <:ecosia:1266017707766055045> [${search}](${ecosiaurl}) • Ecosia \n- <:duckduckgo:1266021571508572261> [${search}](${duckurl}) • DuckDuckGo\n- <:brave:1266017410109149287> [${search}](${braveurl}) • Brave \n- <:bing:1266020917314850907> [${search}](${bingurl}) • Bing \n- <:yahoo:1266019185100718155> [${search}](${yahoourl}) • Yahoo\n- <:qwant:1266021495981998172> [${search}](${qwanturl}) • Qwant \n- <:swisscows:1266020983651958785> [${search}](${swisscows}) • Swisscows \n- <:gibiru:1266020402749247581> [${search}](${gibiru}) • Gibiru\n- <:yandex:1266020634484539515> [${search}](${yandex}) • Yandex \n- <:lilo:1266019331301576754> [${search}](${lilo}) • Lilo`)
      .setTimestamp();
   	if (interaction.guild) {
        embed.setThumbnail(`${interaction.guild.iconURL({ size: 2048 }) }`);
    }
    interaction.editReply({ embeds: [embed] });
  },
};