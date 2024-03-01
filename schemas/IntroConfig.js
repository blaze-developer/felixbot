const { Schema, model } = require("mongoose");

const introConfigSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    approvalChannelId: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: false
    }
});

module.exports = model("IntroConfig", introConfigSchema);
