const mongoose = require("mongoose");

const botSchema = new mongoose.Schema({
    activity: {
        activityType: Number,
        name: String
    }
});

module.exports = mongoose.model("Bot", botSchema);
