import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName("pout").setDescription("Makes u pout >:("),
    category: "Emotes",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Pouty (•̀ ᴖ •́ )`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is pouting! >:(**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/pout");
    const data = await response.json();

    return data.results[0].url;
}
