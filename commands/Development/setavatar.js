const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setavatar")
        .setDescription("Sets the avatar of the bot :3")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addAttachmentOption((option) =>
            option.setName("avatar").setDescription("The avatar to set :3").setRequired(true)
        ),
    devOnly: true,
    category: "Development",
    async execute(interaction) {
        const { options, client } = interaction;

        const avatar = options.getAttachment("avatar");

        await client.user.setAvatar(avatar.attachment).catch(async (err) => {
            await interaction.reply(err);
        });

        await interaction.reply("Avatar Set :3");
    }
};
