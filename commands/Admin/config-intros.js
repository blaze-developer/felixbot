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
            const channelId = interaction.options.getChannel(
                "channel",
                true
            ).id;

            guildData.config.intros.channelId = channelId;

            await guildData.save();

            await interaction.editReply("Channel set :3");
        }

        if (subcommand === "approval-channel") {
            const channelId = interaction.options.getChannel(
                "channel",
                true
            ).id;

            guildData.config.intros.approvalChannelId = channelId;

            await guildData.save();

            await interaction.editReply("Approval channel set :3");
        }

        if (subcommand === "enabled") {
            const enabled = interaction.options.getBoolean("enabled", true);

            if (
                enabled &&
                (guildData.config.intros.channelId === "" ||
                    guildData.config.intros.approvalChannelId === "")
            ) {
                await interaction.editReply({
                    content:
                        "Sorry, you cannot enable the intro approval system without configuring the channels first."
                });

                return;
            }

            guildData.config.intros.enabled = enabled;

            await guildData.save();

            await interaction.editReply({
                content: enabled
                    ? "Intro approval system enabled :3"
                    : "Intro approval system disabled :3"
            });
        }
    },
    data: new SlashCommandBuilder()
        .setName("intros")
        .setDescription(
            "Configures the intros approval system for this server :3"
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("channel")
                .setDescription("Sets the channel for intros to be posted.")
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription("The channel to set.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("approval-channel")
                .setDescription(
                    "Sets the channel for staff to approve or deny introductions."
                )
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription(
                            "The channel for staff to use to approve or deny introductions."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("enabled")
                .setDescription(
                    "Enables and disables the introduction approval system in this server."
                )
                .addBooleanOption((option) =>
                    option
                        .setName("enabled")
                        .setDescription("Whether or not to enable or disable.")
                        .setRequired(true)
                )
        ),
    category: "Admin",
    devOnly: false
};
