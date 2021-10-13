const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const https = require('https');
dotenv.config();
const API_KEY = process.env['API_KEY']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('itemstats')
        .setDescription('Shows basic statistics on an item')
        .addStringOption(option => option.setName('item').setDescription('The skyblock ID of the item you want to view stats for.').setRequired(true)),
    async execute(interaction) {
        let data = '';
        https.get('https://api.hypixel.net/skyblock/bazaar?key=' + API_KEY, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            let input = interaction.options.getString('item').toUpperCase()
            data = JSON.parse(data)
            // ${JSON.stringify(data.products[input].quick_status)}
            try {
            let title = JSON.stringify(data.products[input].quick_status.productId)
            title = title.substring(0, title.length - 1).substring(1);
            interaction.reply({ embeds: [new Discord.MessageEmbed()
                .setTitle(title)
                .addFields(
                    {name: "Sell price (Buy order)", value: `${parseFloat(JSON.stringify(data.products[input].quick_status.sellPrice)).toFixed(1)}`},
                    {name: "Buy price (Sell order)", value: `${parseFloat(JSON.stringify(data.products[input].quick_status.buyPrice)).toFixed(1)}`},
                    {name: "Sell orders", value: `${JSON.stringify(data.products[input].quick_status.sellOrders)}`},
                    {name: "Buy orders", value: `${JSON.stringify(data.products[input].quick_status.buyOrders)}`}
                )
                .setColor("#00FF00")]
                , ephemeral: false })
            } catch(err) {
                interaction.reply({ content: "An error occurred, check if you made any spelling mistakes.", ephemeral: true })
                console.log(err)
            }
        });
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
        
    }
};
