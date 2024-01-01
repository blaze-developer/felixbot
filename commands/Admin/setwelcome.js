const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../schemas/Guild.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcome")
        .setDescription("Sets the welcome channel for this server")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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

        await interaction.editReply({
            content: "Welcome channel set :3",
            ephemeral: true
        });
    }
};
