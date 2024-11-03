const { EmbedBuilder} = require('discord.js')
const { discord } = require('../../config.json')
module.exports = {
    guildNotAllowed: new EmbedBuilder()
        .setTitle('This guild is not allowed to use this Bot!')
        .setDescription(`We are sorry but this guild is not allowed to use the USF Bot.\n\nThis usually happens when guild members break our [Terms of Service](https://github.com/USF-Team/USFBOT#terms-of-service)\nIf you believe this is an error and you are the guild owner, you can appeal in our [Discord Server](${discord}).`),
    userNotAllowed: new EmbedBuilder()
        .setTitle('You are not allowed to use this Bot!')
        .setDescription(`We are sorry but you are not allowed to use the USF Bot.\n\nThis usually happens when you break our [Terms of Service](https://github.com/USF-Team/USFBOT#terms-of-service)\nIf you believe this is an error, you can appeal in our [Discord Server](${discord}).`),
    erbed: new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('We\'re sorry, an error occurred!')
        .setDescription(`Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](${discord})`),
    infoEmbed: new EmbedBuilder()
        .setTitle('USF BOT by DDA International')
        .setDescription('The USF Bot is a Multipurpose Discord Bot created with the scope of helping every Servers with Moderation and Management, making some actions faster with Utility functions and Entertain the Community with Fun features! The Bot is 100% free and features we add are mostly suggested by our Community Members and Members in servers where the Bot is present.\nYou can find a guide in the Discord server and more informations on its own [Github Repository](https://github.com/DDA-International/USFBOT) and the [DDA Website](https://dda.pages.dev)! Made by the DDA Development Team.')
        .setColor(0x000FFF)
        .setThumbnail('https://cdn.discordapp.com/avatars/1090240246005907466/ee1ff1b9bec6271d833dece3222b587b.webp?size=2048')
        .setTimestamp(),
}