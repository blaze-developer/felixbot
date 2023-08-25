const { Events, ActivityType } = require("discord.js");
const Bot = require("../schemas/Bot");

module.exports = {
    name: Events.ClientReady,
    async listener(client) {
        const bot = await Bot.findOne().catch((error) => {
            console.log(error);
        });

        let activity = {
            name: "femboys be femboys",
            type: ActivityType.Watching
        };

        if (bot) {
            activity = {
                name: bot.activity.name,
                type: bot.activity.activityType
            };
        }

        client.user.setPresence({
            activities: [activity]
        });

        console.log("Bot started!");
    }
};
