import { GuildMember } from "discord.js";

export default {
    generateWelcomeCard(background: string, member: GuildMember, text: string, subtext: string) {
        const avatar = member.user.avatarURL({ extension: "png" });

        if (!avatar) {
            console.log("ERROR GETTING USER AVATAR URL");
            return "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/3/3/c/33c137037b2bca71017c0dfd2566125423a1bd51.png";
        }

        return `https://api.popcat.xyz/welcomecard?background=${encodeURIComponent(
            background
        )}&text1=${encodeURIComponent(member.user.username)}&text2=${encodeURIComponent(
            text
        )}&text3=${encodeURIComponent(subtext)}&avatar=${encodeURIComponent(avatar)}`;
    }
};
