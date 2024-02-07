const Profile = require("../schemas/Profile");

const getNeededXp = (level) => level * 25 + 25;

module.exports.getNeededXp = getNeededXp;

module.exports.getProfileData = async (member) => {
    const guildId = member.guild.id;
    const userId = member.user.id;

    const profile = await Profile.findOne({ userId: userId, guildId: guildId });

    if (!profile) {
        return false;
    }

    return profile;
};

module.exports.addXP = async (user, guild, amount, channel) => {
    const { level, xp } = await Profile.findOneAndUpdate(
        {
            guildId: guild.id,
            userId: user.id
        },
        {
            guildId: guild.id,
            userId: user.id,
            $inc: {
                xp: amount
            }
        },
        { upsert: true, new: true }
    );

    addLevel(user, guild, level, xp, channel);
};

module.exports.setLevel = async (user, guild, xp) => {
    await Profile.findOneAndUpdate(
        {
            guildId: guild.id,
            userId: user.id
        },
        {
            guildId: guild.id,
            userId: guild.id,
            xp: xp
        },
        { upsert: true, new: true }
    );
};

async function addLevel(user, guild, level, xp, channel) {
    const xpRequired = getNeededXp(level);

    if (xp >= xpRequired) {
        const { level: newLevel, xp: newXp } = await Profile.findOneAndUpdate(
            { guildId: guild.id, userId: user.id },
            {
                $inc: {
                    level: 1,
                    xp: -xpRequired
                }
            },
            { new: true }
        );

        await channel.send(
            `🎉Congrats ${user}! :3 you are now level ${newLevel}!🎉`
        );

        addLevel(user, guild, newLevel, newXp, channel);
    }
}
