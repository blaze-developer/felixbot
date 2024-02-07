const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("think")
        .setDescription("Makes u think :3"),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Hmmm- hmmm`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is thinking hard-**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/think");
    const data = await response.json();

    return data.results[0].url;
}
