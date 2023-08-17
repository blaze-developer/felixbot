require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const rest = new REST().setToken(process.env.TOKEN);

const commands = [];

function readCommand(command) {
    if (command && command.data && command.execute) {
        commands.push(command.data.toJSON());
    } else {
        console.log(
            `[WARNING] There is one or more missing field at ${commandPath}.`
        );
    }
}

async function registerCommands() {
    try {
        console.log(`Started refreshing ${commands.length} commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log(`Successfully refreshed ${data.length}`);
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

        readCommand(command);
    }
}

registerCommands();
