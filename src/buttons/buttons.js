const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { discord } = require('../../config.json');
module.exports = {
    Discord: new ButtonBuilder()
        .setLabel('Discord')
      	.setURL(`${discord}`)
      	.setStyle(ButtonStyle.Link)
      	.setEmoji('<:discord:1214593450331086868>'),
    Invite: new ButtonBuilder()
        .setLabel('Invite')
        .setURL('https://discord.com/oauth2/authorize?client_id=1090240246005907466')
        .setStyle(ButtonStyle.Link)
        .setEmoji('🔗'),
    Terms: new ButtonBuilder()
        .setLabel('Terms of Service')
        .setURL('https://github.com/DDA-International/USFBOT/blob/main/Terms.md')
        .setStyle(ButtonStyle.Link)
        .setEmoji('🛡'),
    Privacy: new ButtonBuilder()
        .setLabel('Privacy Policy')
        .setURL('https://github.com/DDA-International/USFBOT/blob/main/Privacy.md')
        .setStyle(ButtonStyle.Link)
        .setEmoji('🔒'),
}