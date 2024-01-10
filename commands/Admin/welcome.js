const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    SlashCommandSubcommandBuilder
} = require("discord.js");
const Guild = require("../../schemas/Guild.js");

module.exports = {
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        // Defers respone due to mongodb load times may differ.
        await interaction.deferReply({
            ephemeral: true
        });

        // Gets guild data or creates new one.
        let guildData = await Guild.findOne({
            guildId: interaction.guildId
        });

        if (!guildData) {
            guildData = new Guild({ guildId: interaction.guildId });
        }

        if (subcommand === "channel") {
            const channel = interaction.options.getChannel("channel", true).id;

            guildData.config.welcome.channelId = channel;

            await guildData.save();

            await interaction.editReply("Channel set :3");
        }

        if (subcommand === "enabled") {
            const enabled = interaction.options.getBoolean("enabled", true);

            guildData.config.welcome.enabled = enabled;

            await guildData.save();

            await interaction.editReply({
                content: enabled
                    ? "Welcome messages enabled :3"
                    : "Welcome messages disabled :3"
            });
        }
    },
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Configures the welcome channel for this server")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("channel")
                .setDescription(
                    "Sets the channel to put welcome messages in :3"
                )
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription(
                            "The channel to set as the welcome channel."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("enabled")
                .setDescription(
                    "Enables and disables the welcome channel messages in this server."
                )
                .addBooleanOption((option) =>
                    option
                        .setName("enabled")
                        .setDescription(
                            "Whether or not to enable the welcome messages."
                        )
                        .setRequired(true)
                )
        ),
    category: "Admin",
    devOnly: false
};
