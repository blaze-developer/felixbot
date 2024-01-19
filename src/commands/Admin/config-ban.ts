import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    SlashCommandSubcommandBuilder,
    ChatInputCommandInteraction
} from "discord.js";
import Guild from "../../schemas/Guild";

module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
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

            guildData.config.ban.announcement.channel = channelId;

            await guildData.save();

            await interaction.editReply("Channel set :3");
        }

        if (subcommand === "enabled") {
            const enabled = interaction.options.getBoolean("enabled", true);

            if (enabled && guildData.config.ban.announcement.channel === "") {
                await interaction.editReply({
                    content:
                        "Sorry, you cannot enable the ban annoucement system without setting a channel first."
                });

                return;
            }

            guildData.config.ban.announcement.enabled = enabled;

            await guildData.save();

            await interaction.editReply({
                content: enabled
                    ? "Ban annoucements enabled :3"
                    : "Ban announcements disabled :3"
            });
        }
    },
    data: new SlashCommandBuilder()
        .setName("config-ban")
        .setDescription("Configures the ban system for this server :3")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("channel")
                .setDescription(
                    "Sets the channel for ban annoucements to be posted."
                )
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription("The channel to set.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("enabled")
                .setDescription("Enables and disables ban annoucements.")
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
