const { Events, ActivityType } = require("discord.js");
const Bot = require("../schemas/Bot");

module.exports = {
    name: Events.ClientReady,
    async listener(client) {
        let activity = {
            name: "femboys be femboys",
            type: ActivityType.Watching
        };

        client.user.setActivity(activity);

        console.log("Bot started!");
    }
};
