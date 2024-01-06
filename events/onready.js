const { Events, ActivityType } = require("discord.js");
const activities = require("../config/activities.json");

const statusIntervalSecs = 10;

module.exports = {
    name: Events.ClientReady,
    async listener(client) {
        client.user.setActivity({
            type: ActivityType.Playing,
            name: "booting up..."
        });

        setInterval(() => {
            const index = Math.floor(Math.random() * activities.length);
            client.user.setActivity(activities[index]);
        }, statusIntervalSecs * 1000);

        console.log("Bot started!");
    }
};
