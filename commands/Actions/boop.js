const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("boop")
        .setDescription("Boops a cutie :3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to boop! :3")
                .setRequired(true)
        ),
    category: "Actions",
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");

        const randomGif = randomGIF();

        const embed = new EmbedBuilder()
            .setTitle(`Boop! :3 hehe`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${interaction.user} booped ${user} >:3**`)
            .setImage(randomGif);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};

function randomGIF() {
    const randomNumber = Math.floor(Math.random() * 40);
    return `https://maki.gg/emote/poke/${randomNumber}.gif`;
}
