import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import * as readline from "readline";
import { Config } from '@mass-master/config'
import { NewMessage, NewMessageEvent } from "telegram/events/NewMessage.js";
import { CHANNELS } from "./constants/channels.js";


const API_ID = Config.API_ID; // Replace with your API ID
const API_HASH = Config.API_HASH; // Replace with your API hash
const PHONE_NUMBER = Config.PHONE_NUMBER; // Your Telegram account phone
const SESSION = new StringSession(""); // Leave empty for a new session


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new TelegramClient(SESSION, API_ID, API_HASH, {
    connectionRetries: 5,
});

(async () => {
    console.log("Connecting to Telegram...");


    await client.start({
        phoneNumber: PHONE_NUMBER,
        phoneCode: async () => {
            return new Promise((resolve) => {
                rl.question("Enter the OTP you received: ", (code) => {
                    resolve(code);
                });
            });
        },
        onError: (err) => console.error(err),
    });

    const mainChannel = await client.getEntity('Vovosti_news');


    console.log("Fetching channel posts...");


    const handler = (event: NewMessageEvent) => {
        const message = event.message

        message.forwardTo(mainChannel)
    };


    client.addEventHandler(handler, new NewMessage({ chats: CHANNELS }));
})();



['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
        console.log(`Received ${signal}`);
        client.disconnect()
        process.exit(0);
    });
});