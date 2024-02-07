const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription("Bans a user from the server.")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The user to ban.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for the ban.")
        ),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");

        const confirm = new ButtonBuilder()
            .setCustomId("ban-confirm")
            .setLabel("Confirm")
            .setEmoji("🔨")
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId("ban-cancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary);

        const buttons = new ActionRowBuilder().addComponents(confirm, cancel);

        const prompt = await interaction.reply({
            content: `Are you sure you wanna ban ${target} for reason: ${reason}?`,
            components: [buttons]
        });

        const userFilter = (buttonInteraction) =>
            buttonInteraction.user.id === interaction.user.id;

        try {
            const confirmation = await prompt.awaitMessageComponent({
                filter: userFilter,
                time: 60_000
            });

            if (confirmation.customId === "ban-confirm") {
                await interaction.guild.members.ban(target);

                await confirmation.update({
                    content: `${target.username} has been banned for reason: ${reason}`,
                    components: []
                });
            } else if (confirmation.customId === "ban-cancel") {
                await confirmation.update({
                    content: "Ban cancelled.",
                    components: []
                });
            }
        } catch (error) {
            await interaction.editReply({
                content: "No response recieved, cancelling.",
                components: []
            });
        }
    },
    category: "Moderation",
    enabled: false
};
