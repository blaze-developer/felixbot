import { Events, EmbedBuilder, Client, GuildBan, ChannelType } from "discord.js";

import Guild from "../schemas/Guild";
const bangifs = require("../../config/ban-gifs.json");

module.exports = {
    name: Events.GuildBanAdd,

    async listener(client: Client, ban: GuildBan) {
        let guildData = await Guild.findOne({ guildId: ban.guild.id });

        if (!guildData?.config?.ban?.announcement?.enabled) {
            return;
        }

        const channel = client.channels.cache.get(guildData.config.ban.announcement.channel);

        if (!channel || channel.type !== ChannelType.GuildText) return;

        const embed = new EmbedBuilder()
            .setTitle("BANNED")
            .setDescription(`ZOINKED ${ban.user}`)
            .setColor(process.env.BOT_COLOR)
            .setImage(bangifs[Math.floor(Math.random() * bangifs.length)])
            .setFooter({
                text: `Banned | ${ban.guild.name}`
            });

        await channel.send({ embeds: [embed] });
    }
};
