const {
    SlashCommandBuilder,
    Activity,
    ActivityType,
    EmbedBuilder
} = require("discord.js");

const Bot = require("../../schemas/Bot");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setactivity")
        .setDescription("Sets the activity of the Felix discord bot :3")
        .addNumberOption((option) =>
            option
                .setName("activity-type")
                .setDescription("The activity type for the bot to display :3")
                .addChoices(
                    { name: "Playing", value: ActivityType.Playing },
                    { name: "Watching", value: ActivityType.Watching },
                    { name: "Streaming", value: ActivityType.Streaming },
                    { name: "Competing", value: ActivityType.Competing },
                    { name: "Listening", value: ActivityType.Listening }
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("activity")
                .setDescription("The text of the activity to show :3")
                .setRequired(true)
        ),
    category: "Development",
    devOnly: true,
    async execute(interaction) {
        const activityType = interaction.options.getNumber("activity-type");
        const activityText = interaction.options.getString("activity");

        const newActivity = {
            type: activityType,
            text: activityText
        };

        await Bot.findOneAndUpdate(
            {},
            {
                activity: {
                    name: activityText,
                    activityType: activityType
                }
            },
            { upsert: true }
        ).catch((error) => {
            console.error(error);
        });

        await interaction.client.user.setActivity(activityText, newActivity);

        const embed = new EmbedBuilder()
            .setTitle("Activity Set!")
            .setDescription("Changed the status for felix :3")
            .setColor(process.env.BOT_COLOR);

        await interaction.reply({ embeds: [embed] });
    }
};
