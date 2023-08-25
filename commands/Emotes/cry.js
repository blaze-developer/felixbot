const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cry")
        .setDescription("Makes u cry :("),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Sad :(`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is crying T-T**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/cry");
    const data = await response.json();

    return data.results[0].url;
}
