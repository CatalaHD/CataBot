const Discord = require("discord.js");
const config = require('../../config.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    description: 'Mostra la info del Coronavirus actualment',
    type: 'entreteniment',
    usage: '[ country ]',
    aliases: ['coronavirus'],
    async execute(message, args, servers) {

        let covidUrl = "https://coronavirus-19-api.herokuapp.com/";
        let codeUrl = "https://api.printful.com/countries/";
        let covidData = {};
        let flag = "https://i.imgur.com/oEmt2KA.png";
        let country = "";
        let server = servers[message.guild.id];
        let isWorld = false;

        if (args[0]) {
            covidUrl += "countries/" + args[0].toUpperCase();
            country = args[0];
            if (country.toLowerCase() === "world") {
                isWorld = true;
            }
        } else {
            covidUrl += "countries/world";
            isWorld = true;
        }

        async function getInfo() {
            await fetch(covidUrl)
                .then(res => res.json())
                .then((data) => {
                    covidData = data;
                });
        }

        async function getFlag() {
            await fetch(codeUrl)
                .then(res => res.json())
                .then((data) => {
                    let code = "";
                    data.result.forEach(element => {
                        if (element.name.toLowerCase() === args[0].toLowerCase()) {
                            code = element.code;
                        }
                    });
                    flag = "https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/png250px/" + code.toLowerCase() + ".png";
                });
        }

        function getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        await getInfo().catch(console.error);

        if (!isWorld) {
            await getFlag().catch(console.error);
        }

        if (!covidData.cases) {
            message.reply("el país no existeix! Recorda que ho has de posar en anglès!");
            return message.channel.send(server.prefix + "help covid");
        }

        const covidEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle(isWorld ? "**CORONAVIRUS AL MON**" : "**CORONAVIRUS A " + country + "**")
            .setThumbnail(flag);


        Object.keys(covidData).forEach(camp => {
            // Convertimos el campo en space case
            let result = camp.replace(/([A-Z])/g, " $1");
            let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

            if (covidData[camp])
                covidEmbed.addField("❯ " + finalResult, covidData[camp], true);
        });

        covidEmbed.setTimestamp().setFooter("CataBOT 2020 © All rights reserved");

        message.channel.send(covidEmbed);

    },
};