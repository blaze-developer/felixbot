import { Events, Client, ActivityType } from "discord.js";
const activities = require("../../config/activities.js");

const statusIntervalSecs = 10;

module.exports = {
    name: Events.ClientReady,
    async listener(client: Client) {
        client.user!.setActivity({
            type: ActivityType.Playing,
            name: "booting up..."
        });

        setInterval(() => {
            const index = Math.floor(Math.random() * activities.length);
            client.user!.setActivity(activities[index]);
        }, statusIntervalSecs * 1000);

        console.log("Bot started!");
    }
};
