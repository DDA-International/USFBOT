const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock Paper Scissors with the bot')
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply()
        const RPSRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setStyle(ButtonStyle.Primary),
            )
        const RPSEmbed = new EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle('Rock Paper Scissors')
            .setDescription('Choose your weapon!')
            .setFooter({ text: 'Rock Paper Scissors' });
        const message = await interaction.editReply({ embeds: [RPSEmbed], components: [RPSRow] });
        const filter = i => i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            const choices = ['rock', 'paper', 'scissors']
            const botChoice = choices[Math.floor(Math.random() * choices.length)]
            let result
            if (i.customId === 'rock') {
                if (botChoice === 'rock') {
                    result = 'It\'s a tie!'
                } else if (botChoice === 'paper') {
                    result = 'You lose!'
                } else if (botChoice === 'scissors') {
                    result = 'You win!'
                }
            } else if (i.customId === 'paper') {
                if (botChoice === 'rock') {
                    result = 'You win!'
                } else if (botChoice === 'paper') {
                    result = 'It\'s a tie!'
                } else if (botChoice === 'scissors') {
                    result = 'You lose!'
                }
            } else if (i.customId === 'scissors') {
                if (botChoice === 'rock') {
                    result = 'You lose!'
                } else if (botChoice === 'paper') {
                    result = 'You win!'
                } else if (botChoice === 'scissors') {
                    result = 'It\'s a tie!'
                }
            }
            const RPSResultEmbed = new EmbedBuilder()
                .setTitle('Rock Paper Scissors')
                .setDescription(`You chose ${i.customId}, I chose ${botChoice}. ${result}`);
            if (result === 'You win!') {
                RPSResultEmbed.setColor(0x00ff00)
            } else if (result === 'You lose!') {    
                RPSResultEmbed.setColor(0xff0000)
            }
            await i.update({ embeds: [RPSResultEmbed], components: [] });
            collector.stop();
        });
    }
}