import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    config: {
        type: Object,
        welcome: {
            channelId: {
                type: String,
                default: ""
            },
            message: {
                type: String,
                default: "Welcome to the server! <3"
            },
            image: {
                type: Object,
                background: {
                    type: String,
                    default:
                        "https://cdn.discordapp.com/attachments/1108088953493532823/1141656703239204915/aH229aL.jpg"
                },
                text: {
                    type: String,
                    default: "Welcome to the server! :3"
                },
                subtext: {
                    type: String,
                    default: "Nice to meet ya!"
                }
            },
            enabled: {
                type: Boolean,
                default: false
            }
        },
        intros: {
            channelId: {
                type: String,
                default: ""
            },
            approvalChannelId: {
                type: String,
                default: ""
            },
            enabled: {
                type: Boolean,
                default: false
            }
        },
        ban: {
            type: Object,
            announcement: {
                type: Object,
                enabled: {
                    type: Boolean,
                    default: false
                },
                channel: {
                    type: String,
                    default: ""
                }
            }
        }
    }
    // ,members: [memberSchema]
});

export default mongoose.model("Guild", guildSchema);
