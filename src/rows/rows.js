const { ActionRowBuilder } = require('discord.js');
const { Discord, Invite, Terms, Privacy } = require('../buttons/buttons.js');
module.exports = {
    infoRow: new ActionRowBuilder()
        .addComponents(Discord, Invite, Terms, Privacy),
}