const {
    ActivityType,
    Events,
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config();

// Vars and command reading.

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();

const commandsFolder = path.join(__dirname, "commands");
const subFolders = fs.readdirSync(commandsFolder);

for (const folder of subFolders) {
    const folderPath = path.join(commandsFolder, folder);
    const commands = fs.readdirSync(folderPath);

    for (const commandFile of commands) {
        const commandPath = path.join(folderPath, commandFile);
        const command = require(commandPath);

        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Event Reading init

const eventsFolder = path.join(__dirname, "events");
const events = fs
    .readdirSync(eventsFolder)
    .filter((file) => file.endsWith(".js"));

for (const eventFile of events) {
    const eventPath = path.join(eventsFolder, eventFile);
    const event = require(eventPath);

    console.log(event);

    if (event.name && event.listener) {
        client.on(event.name, (...args) => {
            event.listener(client, ...args);
        });
    } else {
        console.log("One or more fields missing from event " + eventPath);
    }
}

client.once(Events.ClientReady, () => {
    client.user.setPresence({
        activities: [
            { name: "femboys be femboys", type: ActivityType.Watching }
        ]
    });

    console.log("Bot started!");
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName}`);
        return;
    }

    if (command.devOnly && interaction.guildId != process.env.GUILD_ID) {
        await interaction.reply({
            content:
                "This command is only enabled in development servers at this time. Sorry :p"
        });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({
                content: "There was an error with this command!",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "There was an error with this command!",
                ephemeral: true
            });
        }
    }
});

client.login(process.env.TOKEN);
