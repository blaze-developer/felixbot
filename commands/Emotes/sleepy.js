const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sleepy")
        .setDescription("Makes u eepy~ zzz"),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Eeepy~ zzz`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is eepy~**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/yawn");
    const data = await response.json();

    return data.results[0].url;
}
