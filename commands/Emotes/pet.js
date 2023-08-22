const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    AttachmentBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pet")
        .setDescription("Generates a headpet gif :3")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to generate the GIF of :3")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const user = interaction.options.getUser("user");
        const imageURL = await fetchGIF(user);

        const embed = new EmbedBuilder()
            .setTitle(`Headpets :3`)
            .setColor("#a0c9e7")
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
