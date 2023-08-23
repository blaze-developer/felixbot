const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../../schemas/Guild.js");

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
        await interaction.deferReply();

        const channel = interaction.options.getChannel("channel");

        const guildData = await Guild.findOneAndUpdate(
            {
                guildId: interaction.guildId
            },
            {
                guildId: interaction.guildId,
                config: {
                    welcome: {
                        channelId: channel.id
                    }
                }
            },
            { upsert: true }
        );

        await channel.send("This is the welcome channel.");

        await interaction.editReply({
            content: "Welcome channel set!",
            ephemeral: true
        });
    }
};
