const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const LevelManager = require("../../modules/LevelManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setlevel")
        .setDescription("Sets the users level.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to set :3")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("level")
                .setDescription("The level to set.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const level = interaction.options.getNumber("level");

        await LevelManager.setLevel(user, interaction.guild, level);

        await interaction.reply({ content: "Level set!", ephemeral: true });
    },
    category: "Admin",
    devOnly: false
};
// this is a commnet
