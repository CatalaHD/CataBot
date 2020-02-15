const Discord = require("discord.js");

module.exports = {
	name: 'server',
	description: 'Diu la informació del servidor.',
    aliases: ['serverinfo'],
	execute(message) {

        function getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let msg = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setTitle(message.guild.name)
        .setAuthor('CataBOT', 'https://i.imgur.com/UXoPSuU.jpg', 'https://github.com/CatalaHD/DiscordBot')
        .setThumbnail(message.guild.iconURL)
        .addField('Propietari', message.guild.owner.user.username, true)
        .addField('Num Membres', message.guild.memberCount, true)
        .setTimestamp().setFooter("Catabot 2020 © All rights reserved");

		message.channel.send(msg);
	},
};