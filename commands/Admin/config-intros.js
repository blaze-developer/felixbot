const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    SlashCommandSubcommandBuilder
} = require("discord.js");
const Guild = require("../../schemas/Guild.js");
const IntroConfig = require("../../schemas/IntroConfig.js");

module.exports = {
    async execute(interaction) {
        // Defers respone due to mongodb load times may differ.
        await interaction.deferReply({
            ephemeral: true
        });

        // Gets guild data or creates new one.
        let introConfig = await IntroConfig.findOne({
            guildId: interaction.guildId
        });

        const channelId = interaction.options.getChannel("channel", true).id;
        const approvalChannelId = interaction.options.getChannel("approvalchannel", true).id;
        const enabled = interaction.options.getBoolean("enabled");

        if (!introConfig) {
            introConfig = new Guild({
                guildId: interaction.guildId,
                channelId: channelId,
                approvalChannelId: approvalChannelId,
                enabled: enabled
            });
        }

        introConfig.channelId = channelId;
        introConfig.approvalChannelId = approvalChannelId;
        introConfig.enabled = enabled;

        await introConfig.save();

        await interaction.editReply({
            content: "Settings set :>"
        });
    },
    data: new SlashCommandBuilder()
        .setName("intros")
        .setDescription("Configures the intros approval system for this server :3")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option.setName("channel").setDescription("The channel to set.").setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName("approvalchannel")
                .setDescription("The channel for staff to use to approve or deny introductions.")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("enabled")
                .setDescription("Whether or not to enable or disable.")
                .setRequired(false)
        ),
    category: "Admin",
    devOnly: false
};
