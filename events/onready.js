const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async listener(client) {
        client.user.setPresence({
            activities: [
                { name: "femboys be femboys", type: ActivityType.Watching }
            ]
        });

        console.log("Bot started!");
    }
};
