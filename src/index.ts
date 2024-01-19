import { Client, GatewayIntentBits, Collection, EmbedBuilder, time, ChannelType } from "discord.js";

import { readdirSync } from "node:fs";
import { join as pathJoin } from "node:path";
import mongoose from "mongoose";
const nodePackage = require("../package.json");

require("dotenv").config();

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration
    ]
});

client.commands = new Collection();
client.version = nodePackage.version;

// Commands Loading
console.log("Loading commands...");

const commandsFolder = pathJoin(__dirname, "commands");
const subFolders = readdirSync(commandsFolder);

for (const folder of subFolders) {
    const folderPath = pathJoin(commandsFolder, folder);
    const commands = readdirSync(folderPath);

    for (const commandFile of commands) {
        const commandPath = pathJoin(folderPath, commandFile);
        const command = require(commandPath);

        if ("data" in command && "execute" in command && "category" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${commandPath} is missing a required \"data\", \"execute\", or \"category\" property.`
            );
        }
    }
}

// Events Loading

console.log("Loading Events...");

const eventsFolder = pathJoin(__dirname, "events");
const events = readdirSync(eventsFolder).filter(
    (file: string) => file.endsWith(".ts") || file.endsWith(".js")
);

for (const eventFile of events) {
    const eventPath = pathJoin(eventsFolder, eventFile);
    const event = require(eventPath);

    if (event.enabled == false) {
        console.log(`${eventFile} event is disabled.`);
        continue;
    }

    if (event.name && event.listener) {
        client.on(event.name, async (...args: any) => {
            try {
                await event.listener(client, ...args);
            } catch (error: any) {
                console.error(error);
                const channel = client.channels.cache.get("1194467447705718856");

                if (!channel || channel.type !== ChannelType.GuildText) return;

                channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Event Error!")
                            .setColor(process.env.BOT_COLOR)
                            .setDescription(
                                `Error for event ${eventFile} at ${time(Date.now())}\n\n\`\`\`\n${
                                    error.stack
                                }\n\`\`\``
                            )
                    ]
                });
            }
        });
    } else {
        console.log("One or more fields missing from event " + eventPath);
    }
}

console.log("Events loaded!");

// Logging in and mongo auth

mongoose
    .connect(process.env.MONGO_URI ?? "", {
        dbName: process.env.DATABASE_NAME
    })
    .then(() => {
        console.log("Mongoose Connected!");
        client.login(process.env.TOKEN);
    });
