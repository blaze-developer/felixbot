import {
    SlashCommandBuilder,
    EmbedBuilder,
    SlashCommandStringOption,
    ChatInputCommandInteraction
} from "discord.js";

import { join as pathJoin } from "node:path";
import { readdirSync } from "node:fs";

type Category = {
    name: string;
    path: string;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Lists all the commands for the Felix bot :3")
        .addNumberOption((option) =>
            option
                .setName("category")
                .setDescription("The category to get help for :3")
                .addChoices(
                    { name: "Community", value: 2 },
                    { name: "Actions", value: 0 },
                    { name: "Emotes", value: 4 },
                    { name: "Admin", value: 1 },
                    { name: "Moderation", value: 5 }
                )
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const categories = getCategories();

        const categoryChoice = interaction.options.getNumber("category", false);

        await interaction.reply({
            embeds: [generateCategoryEmbed(categories[categoryChoice || 0])]
        });
    },

    devOnly: false,
    category: "Community"
};

function getCategories() {
    const commandsFolder = pathJoin(__dirname, "..");
    const categoryNames = readdirSync(commandsFolder);

    const categories = [];

    for (const categoryName of categoryNames) {
        const categoryPath = pathJoin(commandsFolder, categoryName);

        categories.push({
            name: categoryName,
            path: categoryPath
        });
    }

    return categories;
}

function generateCategoryEmbed(category: Category) {
    const commands = readdirSync(category.path);
    const fields = [];

    for (const commandFile of commands) {
        const commandPath = pathJoin(category.path, commandFile);
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
        .addFields(fields)
        .setFooter({
            text: "/help [category] for other command categories"
        });

    return embed;
}
