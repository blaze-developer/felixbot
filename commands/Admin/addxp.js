const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const LevelManager = require("../../modules/LevelManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addxp")
        .setDescription("Adds xp to a user.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to add xp to :3")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("xp")
                .setDescription("The amount of xp to add.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const xpToAdd = interaction.options.getNumber("xp");

        await LevelManager.addXP(
            user,
            interaction.guild,
            xpToAdd,
            interaction.channel
        );

        await interaction.reply({ content: "Xp Added!", ephemeral: true });
    },
    category: "Admin",
    devOnly: false,
    enabled: false
};
// this is a commnet
