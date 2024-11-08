const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('help').setDescription('Get commands and info about the bot').setDMPermission(true),
    async execute(interaction) {
		await interaction.deferReply();
        const user = interaction.user;
        const helpEmbed = new EmbedBuilder()
        	.setColor(0x0000ff)
        	.setTitle('USFBot Informations')
        	.setDescription('**Bot Prefix:** `/`\n**Terms of Service:** [`Link`](https://github.com/DDA-International/USFBOT/blob/main/Terms.md)\n**Privacy Policy:** [`Link`](https://github.com/DDA-International/USFBOT/blob/main/Privacy.md)\n**Support Server:** [`Link`](https://discord.gg/dV7Hwz7D64)\n**Commands List:** [`Link`](https://github.com/DDA-International/USFBOT/blob/main/Commands.md)\n**Organization Website:** [`Link`](https://dda.pages.dev/)\n**Status Page:** [`Link`](https://dda.instatus.com/)\n**Invite Link:** [`Link`](https://discord.com/oauth2/authorize?client_id=1090240246005907466)')
        	.setThumbnail('https://cdn.discordapp.com/avatars/1090240246005907466/ee1ff1b9bec6271d833dece3222b587b.webp?size=2048')
        	.setFooter({text: `Requested by ${user.username}`, iconURL: `${user.displayAvatarURL({size:32})}`})
        	.setTimestamp();
        const Discord = new ButtonBuilder()
        	.setLabel('Discord')
      		.setURL(`${discord}`)
      		.setStyle(ButtonStyle.Link)
      		.setEmoji('<:th_clyde:1143285999586267207>');
        const row = new ActionRowBuilder()
        	.addComponents(Discord);
        interaction.editReply({components: [row], embeds: [helpEmbed]});
    },
};