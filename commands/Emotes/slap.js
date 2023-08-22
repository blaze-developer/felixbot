const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slap")
        .setDescription("Slaps a meanie!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to slap! :(")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Get slapped! (＃｀д´)ﾉ`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} slapped ${user}!!**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 60);
    return `https://maki.gg/emote/slap/${randomNumber}.gif`;
}
