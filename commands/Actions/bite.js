const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bite")
        .setDescription("Bites a user >:3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to bite! >:3")
                .setRequired(true)
        ),
    category: "Actions",
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`*Nom* >:3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} bit ${user}!! o.o**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 60);
    return `https://maki.gg/emote/bite/${randomNumber}.gif`;
}
