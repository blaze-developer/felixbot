const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emulatejoin")
        .setDescription("Triggers an emulated join event for bot testing.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to emulate joining the server.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const guild = interaction.client.guilds.cache.get(
            "1054636706684489728"
        );

        const member = guild.members.cache.get(user.id);

        interaction.client.emit("guildMemberAdd", member);

        await interaction.reply({ content: "Done!", ephemeral: true });
    }
};
