import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kiss")
        .setDescription("Kisses a user <3")
        .addUserOption((option) =>
            option.setName("user").setDescription("The user to kiss! :3").setRequired(true)
        ),
    category: "Actions",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Ara ara~ <3!`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} kissed ${user} <3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 60);
    return `https://maki.gg/emote/kiss/${randomNumber}.gif`;
}
