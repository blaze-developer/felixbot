import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the bot's ws heartbeat and roundtrip latency for testing :3"),
    async execute(interaction: ChatInputCommandInteraction) {
        const sent = await interaction.reply({
            content: "Pinging...",
            fetchReply: true
        });

        const embed = new EmbedBuilder()
            .setTitle("Ping! :3")
            .setDescription("Diagnostics for websocket heartbeat and round trip latency.")
            .setColor(process.env.BOT_COLOR)
            .setImage(
                "https://i.pinimg.com/originals/ac/b8/8f/acb88f71e5ed54072a24f647e28a9c3f.gif"
            )
            .addFields(
                {
                    name: "💓 Websocket Heartbeat:",
                    value: `${interaction.client.ws.ping}ms`
                },
                {
                    name: "🔃 Roundtrip Latency (Ping):",
                    value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`
                }
            )
            .setFooter({
                text: `Felix Bot v${interaction.client.version}`
            });

        interaction.editReply({ content: "", embeds: [embed] });
    },
    category: "Development"
};
