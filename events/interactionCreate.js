const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async listener(interaction) {
        if (!interaction.isChatInputCommand) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(`No command matching ${interaction.commandName}`);
            return;
        }

        if (command.devOnly && interaction.guildId != process.env.GUILD_ID) {
            await interaction.reply({
                content:
                    "This command is only enabled in development servers at this time. Sorry :p"
            });
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({
                    content: "There was an error with this command!",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "There was an error with this command!",
                    ephemeral: true
                });
            }
        }
    }
};
