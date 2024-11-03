const { SlashCommandBuilder } = require('discord.js');
const { version, discord } = require('../../config.json');
const { infoEmbed } = require('../embeds/embeds.js');
const { infoRow } = require('../rows/rows.js');
var ms = require('ms');
//
module.exports = {
	data: new SlashCommandBuilder()
    	.setName('info').setDescription('Get informations about the bot').setDMPermission(true),
  	async execute(interaction) {
		await interaction.deferReply()
		let uptime = ms(interaction.client.uptime)
		infoEmbed.addFields(
            { name: 'Version', value: `${version}` },
            { name: 'Guilds', value: `${interaction.client.guilds.cache.size}`},
            { name: 'Total Members', value: `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`},
            { name: 'Client Uptime', value: `${uptime}`}
        ).setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`});
        interaction.editReply({ components: [infoRow], embeds: [infoEmbed] });
  	}
}