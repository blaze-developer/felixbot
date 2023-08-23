const { SlashCommandBuilder } = require("discord.js");
const { Guild } = require("../../schemas/Guild");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcome")
        .setDescription("Sets the welcome channel for this server")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription(
                    "The channel to designate as the welcome channel."
                )
                .setRequired(true)
        ),
    category: "Admin",
    devOnly: false,
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        await channel.send("This is the welcome channel.");

        console.log(channel);

        await interaction.reply({
            content: "Welcome channel set!",
            ephemeral: true
        });
    }
};
