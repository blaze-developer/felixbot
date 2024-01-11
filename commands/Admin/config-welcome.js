const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    SlashCommandSubcommandBuilder
} = require("discord.js");
const Guild = require("../../schemas/Guild.js");

module.exports = {
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        // Defers respone due to mongodb load times may differ.
        await interaction.deferReply({
            ephemeral: true
        });

        // Gets guild data or creates new one.
        let guildData = await Guild.findOne({
            guildId: interaction.guildId
        });

        if (!guildData) {
            guildData = new Guild({ guildId: interaction.guildId });
        }

        if (subcommand === "channel") {
            const channel = interaction.options.getChannel("channel", true).id;

            guildData.config.welcome.channelId = channel;

            await guildData.save();

            await interaction.editReply("Channel set :3");
            return;
        }

        if (subcommand === "message") {
            const message = interaction.options.getString("message", true);
            guildData.config.welcome.message = message;

            await guildData.save();
            await interaction.editReply("Welcome message set!");
            return;
        }

        if (subcommand === "card") {
            const text = interaction.options.getString("text");
            const subtext = interaction.options.getString("subtext");
            const background = interaction.options.getString("background-url");

            let optionsChanged = 0;

            if (text) {
                guildData.config.welcome.image.text = text;
                optionsChanged++;
            }

            if (subtext) {
                guildData.config.welcome.image.subtext = subtext;
                optionsChanged++;
            }

            if (background) {
                guildData.config.welcome.image.background = background;
                optionsChanged++;
            }

            if (optionsChanged == 0) {
                await interaction.editReply(
                    "You didnt set any options to change for the welcome card."
                );
                return;
            }

            await guildData.save();
            await interaction.editReply(
                `Successfully set ${optionsChanged} welcome card option${
                    optionsChanged > 1 ? "s" : ""
                } :3`
            );
            return;
        }

        if (subcommand === "enabled") {
            const enabled = interaction.options.getBoolean("enabled", true);

            if (enabled && guildData.config.welcome.channelId === "") {
                await interaction.editReply(
                    "Sorry, you cannot enable welcome messages without configuring the welcome channel first."
                );
                return;
            }

            guildData.config.welcome.enabled = enabled;

            await guildData.save();

            await interaction.editReply({
                content: enabled
                    ? "Welcome messages enabled :3"
                    : "Welcome messages disabled :3"
            });
            return;
        }
    },
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Configures the welcome channel for this server")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("channel")
                .setDescription(
                    "Sets the channel to put welcome messages in :3"
                )
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription(
                            "The channel to set as the welcome channel."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("message")
                .setDescription(
                    "Sets the message to be shown on welcome messages <3"
                )
                .addStringOption((option) =>
                    option
                        .setName("message")
                        .setDescription("The message to be shown.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("card")
                .setDescription("Configures the welcome cards text and images.")
                .addStringOption((option) =>
                    option
                        .setName("text")
                        .setDescription("The first line of text.")
                )
                .addStringOption((option) =>
                    option
                        .setName("subtext")
                        .setDescription("The second line of text.")
                )
                .addStringOption((option) =>
                    option
                        .setName("background-url")
                        .setDescription(
                            "The direct url to the welcome cards background image. (.png, .jpg)"
                        )
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("enabled")
                .setDescription(
                    "Enables and disables the welcome channel messages in this server."
                )
                .addBooleanOption((option) =>
                    option
                        .setName("enabled")
                        .setDescription(
                            "Whether or not to enable the welcome messages."
                        )
                        .setRequired(true)
                )
        ),
    category: "Admin",
    devOnly: false
};
