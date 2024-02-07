const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yeet")
        .setDescription("Yeets a user >:3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to yeet! :3")
                .setRequired(true)
        ),
    category: "Actions",
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = await randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Yeet! >:3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(
                `**${interaction.user} just yeeted ${user}!!! uh oh o.o**`
            )
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

async function randomGIF() {
    const response = await fetch("https://nekos.best/api/v2/yeet");
    const data = await response.json();

    return data.results[0].url;
}
