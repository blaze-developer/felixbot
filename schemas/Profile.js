const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Profile", profileSchema);
