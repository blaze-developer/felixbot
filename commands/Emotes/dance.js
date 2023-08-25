const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dance")
        .setDescription("Makes u dance! :3"),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Dance party woo!! :3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is dancing!!! :3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/dance");
    const data = await response.json();

    return data.results[0].url;
}
