export default {
    name: "ping",
    description: "Replies pong for bot testing :3",
    execute: (interaction) => {
        interaction.reply("Pong!");
    }
};
