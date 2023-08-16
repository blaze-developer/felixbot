import {
    ActivityType,
    Client,
    Events,
    GatewayIntentBits,
    Status
} from "discord.js";
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    client.user.setPresence({
        activities: [
            { name: "femboys be femboys", type: ActivityType.Watching }
        ]
    });

    console.log("Bot started!");
});

client.login(process.env.TOKEN);
