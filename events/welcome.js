const { Events, AttachmentBuilder } = require("discord.js");
const Guild = require("../schemas/Guild");

module.exports = {
    name: Events.GuildMemberAdd,
    async listener(client, member) {
        const guildData = await Guild.findOne({
            guildId: member.guild.id
        });

        if (!guildData) return;

        const channel = client.channels.cache.get(
            guildData.config.welcome.channelId
        );

        if (channel) {
            await channel.send({
                content: `User ${member.user} joined! Welcome to the femboy party! <3`,
                files: [generatePopcat(member)]
            });
        }
    }
};

function generatePopcat(member) {
    const avatar = member.user.avatarURL({ extension: "png" });
    return `https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/1108088953493532823/1141656703239204915/aH229aL.jpg&text1=${member.user.username}&text2=Welcome+To+The+Femboy+Party!+:3&text3=We+dont+bite+hard+;3&avatar=${avatar}`;
}

// https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/793764483037528065/998626477648138330/unknown.jpeg&text1=blazedev&text2=Welcome+To+The+Femboy+Party!+:3&text3=We+dont+bite+hard+;3&avatar=https://cdn.discordapp.com/avatars/780997710635335710/3eb407326d93817e76c0434bf51efa59.png
