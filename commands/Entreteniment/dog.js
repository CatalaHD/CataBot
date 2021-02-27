const Discord = require("discord.js");
const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');
const {
    getRandomColor
} = require('../../lib/common.js');

module.exports = {
    name: 'dog',
    description: 'Mostra una imatge d\'un gos aleatori',
    type: 'entreteniment',
    aliases: ['gos'],
    cooldown: 10,
    async execute(message) {

        let desc = "";
        let dogUrl = "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big.png";

        async function getCat() {
            await fetch("https://api.thedogapi.com/v1/images/search?api_key='" + process.env.catAPIKey + "'?mime_types=gif")
                .then(res => res.json())
                .then((data) => {
                    dogUrl = data[0].url;
                });
        }

        async function getTitle() {
            await fetch("https://some-random-api.ml/facts/dog")
                .then(res => res.json())
                .then(async (data) => {
                    desc += data.fact;
                    await translate(desc, {
                        to: "es"
                    }).then(res => {
                        desc = res.text;
                    });
                });
        }

        await getCat().catch(console.error);
        await getTitle().catch(console.error);

        const catEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle("🐶 GOSSETS!! 🐶")
            .setDescription(desc)
            .setImage(dogUrl).setTimestamp().setFooter(`CataBOT ${new Date().getFullYear()} © All rights reserved`);

        message.channel.send(catEmbed);

    },
};