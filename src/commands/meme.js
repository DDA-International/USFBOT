const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('meme').setDescription('Generate a random meme').setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        let memeBed = new EmbedBuilder();
        const axios = require('axios');

        const getMeme = async () => {
            try {
                const response = await axios.get('https://meme-api.com/gimme');
                const meme = response.data;
                memeBed.setTitle(meme.title);
                memeBed.setImage(meme.url);
                return memeBed;
            } catch (error) {
                console.error('Error during meme fetch:', error);
            }
        };
        const genMeme = await getMeme();
        await interaction.editReply({embeds: [genMeme]});
    }
}