import mongoose from "mongoose";

interface IGuild {
    guildId: string;
    config: {
        welcome: {
            channelId: string;
            message: string;
            image: {
                background: string;
                text: string;
                subtext: string;
            };
            enabled: boolean;
        };
        intros: {
            channelId: string;
            approvalChannelId: string;
            enabled: boolean;
        };
        ban: {
            announcement: {
                enabled: boolean;
                channel: string;
            };
        };
    };
}

const guildSchema = new mongoose.Schema<IGuild>({
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
            message: {
                type: String,
                default: "Welcome to the server! <3"
            },
            image: {
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
            announcement: {
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

export default mongoose.model<IGuild>("Guild", guildSchema);
