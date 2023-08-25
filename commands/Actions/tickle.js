const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickle")
        .setDescription("Tickles a user >:3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to tickle! :3")
                .setRequired(true)
        ),
    category: "Actions",
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Tickless!!!! >:3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(
                `**${user}! ${interaction.user} is tickling you!!! >:3**`
            )
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 60);
    return `https://maki.gg/emote/tickle/${randomNumber}.gif`;
}
