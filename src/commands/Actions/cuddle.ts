import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cuddle")
        .setDescription("Cuddles a user <3")
        .addUserOption((option) =>
            option.setName("user").setDescription("The user to give cuddles! :3").setRequired(true)
        ),
    category: "Actions",
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Snuggles <3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} is cuddling ${user} <3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 60);
    return `https://maki.gg/emote/cuddle/${randomNumber}.gif`;
}
