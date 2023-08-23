const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildid: String,
    config: {
        welcome: {
            channelid: String
        }
    }
});

module.exports = mongoose.model("Guild", guildSchema);
