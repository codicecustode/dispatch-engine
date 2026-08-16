import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config();

export const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
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
