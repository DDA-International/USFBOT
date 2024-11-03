const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('servericon').setDescription('Get the icon of the server').setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply()
        const iconEmbed = new EmbedBuilder()
            .setImage(`${interaction.guild.iconURL({ size:4096 })}`);
        await interaction.editReply({ embeds: [iconEmbed] })
    }
}