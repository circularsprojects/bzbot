const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('a test command'),
    async execute(interaction) {
        interaction.reply({ content: 'this is a test command', ephemeral: true })
    }
};
