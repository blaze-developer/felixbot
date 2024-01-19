import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    ButtonInteraction,
    CollectorFilter
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription("Bans a user from the server.")
        .addUserOption((option) =>
            option.setName("target").setDescription("The user to ban.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for the ban.").setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser("target", true);
        const reason = interaction.options.getString("reason", true);

        if (!interaction.guild) return;

        const confirm = new ButtonBuilder()
            .setCustomId("ban-confirm")
            .setLabel("Confirm")
            .setEmoji("🔨")
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId("ban-cancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary);

        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(confirm, cancel);

        const prompt = await interaction.reply({
            content: `Are you sure you wanna ban ${target} for reason: ${reason}?`,
            components: [buttons]
        });

        try {
            const confirmation = await prompt.awaitMessageComponent({
                filter: (buttonInteraction): boolean =>
                    buttonInteraction.user.id === interaction.user.id,
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
    category: "Moderation"
};
