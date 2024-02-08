const { Events, AttachmentBuilder } = require("discord.js");
const Guild = require("../schemas/Guild");
const { evaluateStringTemplate } = require("string-template-parser");

const WelcomeImage = require("../modules/WelcomeImage");

module.exports = {
    name: Events.GuildMemberAdd,
    async listener(client, member) {
        let guildData = await Guild.findOne({
            guildId: member.guild.id
        });

        // Checks if welcome is enabled and that the data loaded correctly
        if (!guildData?.config?.welcome?.enabled) {
            return;
        }

        // Gets the channel object to send to
        const channel = client.channels.cache.get(guildData.config.welcome.channelId);

        if (!channel) {
            return;
        }

        const welcomeImage = await WelcomeImage.welcomeCard(guildData.config.welcome.image, member);

        await channel.send({
            content: evaluateStringTemplate(guildData.config.welcome.message, {
                user: `${member.user}`,
                server: member.guild.name
            }),
            files: [welcomeImage]
        });
    }
};

// https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/793764483037528065/998626477648138330/unknown.jpeg&text1=blazedev&text2=Welcome+To+The+Femboy+Party!+:3&text3=We+dont+bite+hard+;3&avatar=https://cdn.discordapp.com/avatars/780997710635335710/3eb407326d93817e76c0434bf51efa59.png
