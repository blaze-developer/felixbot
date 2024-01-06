const { Events, ActivityType } = require("discord.js");
const LevelManager = require("../modules/LevelManager");

module.exports = {
    name: Events.MessageCreate,
    enabled: false,
    async listener(client, message) {
        if (message.author.bot) {
            return;
        }

        const result = await LevelManager.addXP(
            message.member.user,
            message.guild,
            1,
            message.channel
        );
    }
};
