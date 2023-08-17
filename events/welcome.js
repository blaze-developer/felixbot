const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async listener(member) {
        console.log(`Guild Member ${member.name} Added`);
    }
};

// https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/793764483037528065/998626477648138330/unknown.jpeg&text1=blazedev&text2=Welcome+To+The+Femboy+Party!+:3&text3=We+dont+bite+hard+;3&avatar=https://cdn.discordapp.com/avatars/780997710635335710/3eb407326d93817e76c0434bf51efa59.png
