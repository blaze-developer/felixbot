import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emulatejoin")
        .setDescription("Triggers an emulated join event for bot testing.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to emulate joining the server.")
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user", true);
        const guild = interaction.guild;

        if (!guild) return;

        const member = await guild.members.fetch(user.id);

        interaction.client.emit("guildMemberAdd", member);

        await interaction.reply({ content: "Done!", ephemeral: true });
    },
    devOnly: false,
    category: "Development"
};
