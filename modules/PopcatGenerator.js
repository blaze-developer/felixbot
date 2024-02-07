module.exports = {
    generateWelcomeCard(background, member, text, subtext) {
        const avatar = member.user.avatarURL({ extension: "png" });

        return `https://api.popcat.xyz/welcomecard?background=${encodeURIComponent(
            background
        )}&text1=${encodeURIComponent(
            member.user.username
        )}&text2=${encodeURIComponent(text)}&text3=${encodeURIComponent(
            subtext
        )}&avatar=${encodeURIComponent(avatar)}`;
    }
};
