const { Events, EmbedBuilder, time } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async listener(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        if (command.enabled == false) {
            await interaction.reply({
                content: "This command is disabled.",
                ephemeral: true
            });
            return;
        }

        if (command.devOnly && interaction.guildId != process.env.GUILD_ID) {
            await interaction.reply({
                content:
                    "This command is only enabled in development servers at this time. Sorry :p",
                ephemeral: true
            });
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const channel = client.channels.cache.get("1194467447705718856");

            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Command Error!")
                        .setColor(process.env.BOT_COLOR)
                        .setDescription(
                            `Error for command ${interaction.commandName} in ${
                                interaction.guild.name
                            } at ${time(Date.now())}\n\n\`\`\`\n${
                                error.stack
                            }\n\`\`\``
                        )
                ]
            });

            let errorMessage = {
                content: "There was an error with this command!",
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.editReply(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};
