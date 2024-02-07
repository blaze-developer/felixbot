const { Events } = require("discord.js");
const bangifs = require("../config/ban-gifs.json");

module.exports = {
    name: Events.GuildBanAdd,
    enabled: false,
    async listener(client, ban) {
        console.log(ban);
    }
};
