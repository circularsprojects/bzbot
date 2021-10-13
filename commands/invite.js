const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Gives you the bot invite link'),
    async execute(interaction) {
        interaction.reply({ content: 'https://discord.com/api/oauth2/authorize?client_id=897644591761739816&permissions=2048&scope=bot%20applications.commands', ephemeral: true })
    }
};
