import { Message, Events, Client } from "discord.js";

import Guild from "../schemas/Guild";

module.exports = {
    name: Events.MessageCreate,

    async listener(client: Client, message: Message) {
        let guildData = Guild.findOne({ guildId: message.guildId });

        if (!guildData) {
            return;
        }

        // Yes this is hard coded for one specific server i care about more deal with it
        if (message.channelId !== "1108091129896898641") {
            return;
        }

        if (!client.user) {
            return;
        }

        if (message.author.id !== client.user.id) {
            message.delete();
        }
    }
};
