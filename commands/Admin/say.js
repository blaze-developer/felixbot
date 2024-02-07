const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Says something in the current chat.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to send in the chat :3")
                .setMaxLength(2000)
                .setRequired(true)
        ),
    async execute(interaction) {
        const message = interaction.options.getString("message");
        const channel = interaction.channel;

        await channel.send(message);
        await interaction.reply({ content: "Sent!", ephemeral: true });
    },
    category: "Admin",
    devOnly: false
};
