const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");
const { join } = require("path");

Canvas.GlobalFonts.registerFromPath(
    join(__dirname, "../assets/fonts/ConcertOne-Regular.ttf"),
    "Concert One"
);

module.exports.welcomeCard = async (data, member) => {
    const canvas = Canvas.createCanvas(1024, 500);
    const context = canvas.getContext("2d");

    const bg = await Canvas.loadImage(data.background);

    const avatarURL = await member.displayAvatarURL({ extension: "jpg", size: 512 });
    const avatarImage = await Canvas.loadImage(avatarURL);

    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    const avatar = {
        width: 250,
        height: 250,
        x: center.x,
        top: 50
    };

    avatar.radius = avatar.width / 2;
    avatar.adjustedX = avatar.x - avatar.radius;
    avatar.centerY = avatar.top + avatar.radius;

    // Draw Bg
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // Draw Circle Outlines Behind Avatar
    context.beginPath();
    context.fillStyle = "gray";
    context.arc(avatar.x, avatar.centerY, avatar.radius + 10 + 1, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    context.beginPath();
    context.fillStyle = "white";

    context.arc(avatar.x, avatar.centerY, avatar.radius + 10, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    // Draw Text
    context.font = "80px Concert One";
    context.textAlign = "center";
    context.fillText(member.displayName, center.x, 460 - 10 - 30 - 10 - 30 - 5, 924);

    context.font = "40px Concert One";
    context.fillText(data.text, center.x, 460 - 10 - 30, 924);

    context.font = "30px Concert One";
    context.fillText(data.subtext, center.x, 460, 924);

    // Set Clipping Mask (IRREVERSIBLE)
    context.beginPath();
    context.arc(avatar.x, avatar.centerY, avatar.radius, 0, Math.PI * 2);
    context.clip();
    context.closePath();

    // Draw Avatar
    context.drawImage(avatarImage, avatar.adjustedX, avatar.top, avatar.width, avatar.width);

    return new AttachmentBuilder(await canvas.encode("png"), { name: "card.png" });
};
