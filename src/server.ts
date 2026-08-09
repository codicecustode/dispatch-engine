import fastify from "fastify";
import { createServer } from "node:http";
import { Server } from "socket.io"
import { client, initRedis } from "./redis/redis.config.ts"
import dotenv from "dotenv"
import { LocationService } from "./location/locationService.ts";
dotenv.config();

const app = fastify({
    logger: true
})

const server = createServer(app.server);

const io = new Server(server);

await initRedis();

io.on("connection", (socket) => {
    console.log(socket)
    socket.on("DRIVER_LOCATION_UPDATE", (locationData) => {

        console.log("Location received:", locationData);

        const { lag, lat, driverId } = locationData;

        LocationService.updateDriverLocation(client, lat, lag, driverId)

    });

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected:", socket.id);
    });
})

io.listen(3001)
