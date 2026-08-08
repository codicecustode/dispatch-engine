import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config();

if(!process.env.REDIS_URL){
    throw new Error("Redis URL is missing")
}
export const client = createClient({
    url: process.env.REDIS_URL
});

export const initRedis = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
}

client.on('error', (err) => {
    console.error(err);
})

client.on('ready', () => {
    console.info("Redis is ready to use");
})
