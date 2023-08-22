const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    AttachmentBuilder
} = require("discord.js");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pet")
        .setDescription("Pets someone :3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to generate the GIF of :3")
                .setRequired(true)
        ),
    category: "Emotes",
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");
        const imageURL = await fetchGIF(user);

        const embed = new EmbedBuilder()
            .setTitle(`Headpets :3`)
            .setColor(process.env.BOT_COLOR)
            .setDescription(`**${user}, ${interaction.user} pet u! :3**`);
        await interaction.editReply({
            files: [{ name: "headpat.gif", attachment: imageURL }],
            embeds: [embed]
            // content: `${user}, ${interaction.user} headpatted u! :3`,
        });
    }
};

async function fetchGIF(user) {
    const avatar = await user.avatarURL({ extension: "png" });
    return `https://api.popcat.xyz/pet?image=${avatar}`;
}
