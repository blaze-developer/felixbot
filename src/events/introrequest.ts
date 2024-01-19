import {
    Events,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    Message,
    Client,
    ChannelType
} from "discord.js";
import Guild from "../schemas/Guild";

module.exports = {
    name: Events.MessageCreate,
    async listener(client: Client, message: Message) {
        // Ignore bot messages (yourself)
        if (message.author.bot) {
            return;
        }

        // Fetch Database Data
        let guildData = await Guild.findOne({ guildId: message.guildId });

        // Check if not enabled or data didnt load correctly
        if (!guildData?.config?.intros?.enabled) {
            return;
        }

        // Check if in correct channel
        if (!(message.channel.id == guildData.config.intros.channelId)) {
            return;
        }

        // Fetch Approval Channel and ensure its existence.
        const approvalChannel = client.channels.cache.get(
            guildData.config.intros.approvalChannelId
        );

        if (!approvalChannel) {
            return;
        }

        if (approvalChannel.type !== ChannelType.GuildText) return;

        // Deletes message and sends prompt in approval channel :3
        message.delete();

        const approveButton = new ButtonBuilder()
            .setCustomId("intro-approve")
            .setLabel("Approve")
            .setEmoji("👍")
            .setStyle(ButtonStyle.Success);

        const denyButton = new ButtonBuilder()
            .setCustomId("intro-deny")
            .setLabel("Deny")
            .setEmoji("👎")
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
            approveButton,
            denyButton
        );

        const prompt = approvalChannel.send({
            content: message.content,
            components: [actionRow]
        });
    }
};
