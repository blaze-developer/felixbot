const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

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

        const enabled = interaction.options.getBoolean("enabled", true);

        if (enabled && !introConfig) {
            await interaction.editReply({
                content:
                    "Sorry, you cannot enable the intro approval system without configuring the channels first. Run /config-intros [channel] [approvalchannel]"
            });

            return;
        }

        introConfig.enabled = enabled;

        await introConfig.save();

        await interaction.editReply({
            content: enabled
                ? "Intro approval system enabled :3"
                : "Intro approval system disabled :3"
        });
    },
    data: new SlashCommandBuilder()
        .setName("intros-enable")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Enables or disables intros :3")
        .addBooleanOption((option) =>
            option
                .setName("enabled")
                .setDescription("Wether or not to enable it.")
                .setRequired(true)
        ),
    category: "Admin",
    devOnly: false
};
