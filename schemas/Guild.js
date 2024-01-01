const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildId: String,
    config: {
        welcome: {
            channelId: String
        }
    }
    // ,members: [memberSchema]
});

module.exports = mongoose.model("Guild", guildSchema);
