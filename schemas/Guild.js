const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    config: {
        welcome: {
            channelId: {
                type: String,
                default: ""
            },
            enabled: {
                type: Boolean,
                default: false
            }
        }
        // intros: {
        //     channelId: String,
        //     enabled: {
        //         type: Boolean,
        //         default: false
        //     }
        // }
    }
    // ,members: [memberSchema]
});

module.exports = mongoose.model("Guild", guildSchema);
