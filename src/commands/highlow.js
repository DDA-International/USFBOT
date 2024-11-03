const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('highlow').setDescription('Play a game of highlow').setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        const number = Math.floor(Math.random() * 99) + 1;
        const number2 = Math.floor(Math.random() * 100) + 1;
        const highLowEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('HighLow Minigame')
            .setDescription(`I have chosen the number ${number}. Will the next number be higher, lower or match?`)
            .setFooter({ text: 'Choose wisely!' });
        const higherButton = new ButtonBuilder()
            .setCustomId('higher')
            .setLabel('Higher')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬆️');
        const matchButton = new ButtonBuilder()
            .setCustomId('match')
            .setLabel('Match')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('↔️');
        const lowerButton = new ButtonBuilder()
            .setCustomId('lower')
            .setLabel('Lower')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬇️');
        const highLowRow = new ActionRowBuilder()
            .addComponents(lowerButton, matchButton, higherButton);
        const message = await interaction.editReply({ embeds: [highLowEmbed], components: [highLowRow] });
        const filter = i => i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'higher') {
                if (number2 > number) {
                    const winEmbed = new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle('You won!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [winEmbed], components: [] });
                } else {
                    const loseEmbed = new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle('You lost!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [loseEmbed], components: [] });
                }
            } else if (i.customId === 'lower') {
                if (number2 < number) {
                    const winEmbed = new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle('You won!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [winEmbed], components: [] });
                } else {
                    const loseEmbed = new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle('You lost!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [loseEmbed], components: [] });
                }
            } else if (i.customId === 'match') {
                if (number2 === number) {
                    const winEmbed = new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle('You won!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [winEmbed], components: [] });
                } else {
                    const loseEmbed = new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle('You lost!')
                        .setDescription(`The number was ${number2}.`);
                    await i.update({ embeds: [loseEmbed], components: [] });
                }
            }
            collector.stop();
        });
    }
}