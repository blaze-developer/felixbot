const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shrug")
        .setDescription("Makes u shrug! :3"),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`i dunno o.o`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is shrugging ¯\\_(ツ)_/¯**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/shrug");
    const data = await response.json();

    return data.results[0].url;
}
