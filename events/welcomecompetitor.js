const { Events } = require("discord.js");
const Guild = require("../schemas/Guild");

module.exports = {
    name: Events.MessageCreate,
    async listener(client, message) {
        // Yes this is hard coded for one specific server i care about more deal with it
        if (message.channelId !== "1108091129896898641") {
            return;
        }

        if (message.author.id !== client.user.id) {
            message.delete();
        }
    }
};
