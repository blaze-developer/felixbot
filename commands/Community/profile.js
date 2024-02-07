const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Profile = require("../../schemas/Profile");
const LevelManager = require("../../modules/LevelManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Shows the profile :3")
        .setDMPermission(false),
    category: "Community",
    async execute(interaction) {
        const { xp, level } = await LevelManager.getProfileData(
            interaction.member
        );

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.displayName}'s Profile`)
            .setColor(process.env.BOT_COLOR)
            .addFields(
                { name: "Level", value: `${level}` },
                {
                    name: "Level Progress",
                    value: generateProgressBar(xp, level),
                    inline: true
                }
            );

        await interaction.reply({ embeds: [embed] });
    }
};

function generateProgressBar(xp, level) {
    const xpNeeded = LevelManager.getNeededXp(level);
    const percentage = xp / xpNeeded;

    let progressBar = "";

    for (let n = 0; n < 20; n++) {
        if (percentage > n / 20) {
            progressBar += "▓";
        } else {
            progressBar += "░";
        }
    }

    return progressBar;
}
