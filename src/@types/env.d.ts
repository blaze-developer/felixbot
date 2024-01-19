import { ColorResolvable } from "discord.js";

declare namespace NodeJS {
    export interface ProcessEnv {
        // add more environment variables and their types here
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            GUILD_ID: string;
            CLIENT_ID: string;
            BOT_COLOR: ColorResolvable;
            MONGO_URI: string;
            DATABASE_NAME: string;
        }
    }
}

export {};
