import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName("blush").setDescription("Makes u blush! :3"),
    category: "Emotes",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Blushies >-<`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is blushing :3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/blush");
    const data = await response.json();

    return data.results[0].url;
}
