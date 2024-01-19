import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName("laugh").setDescription("Makes u laugh! haha"),
    category: "Emotes",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Teehee hehe haha!! :3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is laughing :3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/laugh");
    const data = await response.json();

    return data.results[0].url;
}
