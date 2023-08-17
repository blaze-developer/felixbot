const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pong")
        .setDescription("Replies with ping for testing :3"),
    async execute(interaction) {
        await interaction.reply("Ping!");
    }
};
