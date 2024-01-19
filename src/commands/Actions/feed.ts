import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("feed")
        .setDescription("Feeds a user :3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to food delicious food! :3")
                .setRequired(true)
        ),
    category: "Actions",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Yummies :3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${user}, ${interaction.user} is feeding u! :3 <3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/feed");
    const data = await response.json();

    return data.results[0].url;
}
