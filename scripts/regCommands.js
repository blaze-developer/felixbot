require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const rest = new REST().setToken(process.env.TOKEN);

const applicationCommands = [];
const devServerCommands = [];

function readCommand(command) {
    if (command && command.data && command.execute) {
        devServerCommands.push(command.data.toJSON());

        if (!command.devOnly) {
            applicationCommands.push(command.data.toJSON());
        }
    } else {
        console.log(`[WARNING] There is one or more missing field at ${command.path}.`);
    }
}

async function registerCommands() {
    try {
        console.log(`Started refreshing ${devServerCommands.length} commands.`);

        const devData = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: devServerCommands }
        );

        const publicData = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: applicationCommands
        });

        console.log(
            `Successfully refreshed ${devData.length} total commands. ${publicData.length} are publicly available.`
        );
    } catch (error) {
        console.error(error);
    }
}

const commandsFolder = path.join(__dirname, "../commands");
const subFolders = fs.readdirSync(commandsFolder);

for (const folder of subFolders) {
    const folderPath = path.join(commandsFolder, folder);
    const commands = fs.readdirSync(folderPath);

    for (const commandFile of commands) {
        const commandPath = path.join(folderPath, commandFile);
        const command = require(commandPath);
        command.path = commandPath;

        readCommand(command);
    }
}

registerCommands();
