const Discord = require("discord.js");
const {
    getRandomColor
} = require('../../lib/common.js');

module.exports = {
    name: 'choice',
    description: 'Deix que el bot escolleixi per tu.\n**SI QUE ES PERMETEN ESPAIS** mentre es repectin les comes',
    type: 'entreteniment',
    aliases: ['escolleix'],
    cooldown: 0,
    usage: '< choice 1, choice2, ...>',
    execute(message, args, server) {

        if (!args[0]) {
            message.reply("no se que escollir!");
            return message.channel.send(server.prefix + "help choice");
        }

        let choices = args.join(" ").split(", ");
        let choice = choices[Math.floor(Math.random() * choices.length)];

        let msg = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle("**ESCOLLEIX**")
            .setThumbnail('https://bit.ly/CataBot_RawIcon')
            .addField('❯ Escollida', choice, true)
            .setTimestamp().setFooter(`CataBOT ${new Date().getFullYear()} © All rights reserved`);

        message.channel.send(msg);
    },
};