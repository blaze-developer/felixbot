const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Lists all the commands for the Felix bot :3"),
    async execute(interaction) {
        const categories = getCategories();

        await interaction.reply({
            content: "Help command",
            embeds: [generateCategoryEmbed(categories[2])]
        });
    },
    devOnly: true,
    category: "Community"
};

function getCategories() {
    const commandsFolder = path.join(__dirname, "..");
    const categoryNames = fs.readdirSync(commandsFolder);

    const categories = [];

    for (const categoryName of categoryNames) {
        const categoryPath = path.join(commandsFolder, categoryName);

        categories.push({
            name: categoryName,
            path: categoryPath
        });
    }

    return categories;
}

function generateCategoryEmbed(category) {
    const commands = fs.readdirSync(category.path);
    const fields = [];

    for (const commandFile of commands) {
        const commandPath = path.join(category.path, commandFile);
        const command = require(commandPath);

        fields.push({
            name: `**/${command.data.name}:**`,
            value: command.data.description,
            inline: true
        });
    }

    const embed = new EmbedBuilder()
        .setTitle(category.name)
        .setColor(process.env.BOT_COLOR)
        .setAuthor({
            name: "Felix",
            iconURL:
                "https://cdn.discordapp.com/avatars/1141264397495447582/e1a0a2e5e5a386cedb1cce092d48d897.png"
        })
        .addFields(fields);

    return embed;
}
