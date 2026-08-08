import fastify from "fastify";
import { createServer } from "node:http";
import { Server } from "socket.io"
import {client, initRedis} from "./redis/redis.config.ts"
import dotenv from "dotenv"
dotenv.config();

const app = fastify({
    logger: true
})

const server = createServer(app.server);

const io = new Server(server);

await initRedis();

io.on("connection", (socket) => {
    console.log(socket)
})

io.listen(3001)
