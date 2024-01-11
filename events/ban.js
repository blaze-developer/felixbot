const { Events } = require("discord.js");

const bangifs = [
    "https://tenor.com/pIgnOzPJNar.gif",
    "https://tenor.com/boBQR.gif",
    "https://tenor.com/bgbKc.gif"
];

module.exports = {
    name: Events.GuildBanAdd,
    async listener(client, ban) {}
};
