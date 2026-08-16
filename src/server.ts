import fastify from "fastify";
import { createServer } from "node:http";
import { Server } from "socket.io"
import { client, initRedis } from "./redis/redis.config.ts"
import dotenv from "dotenv"
import { LocationService } from "./location/locationService.ts";
import { DriverState } from "./driver/driverStates.ts";
import { DRIVER_AVAILABLE, DRIVER_LOCATION_UPDATE } from "./constants/driver.ts";
dotenv.config();
import {orderRoute} from '../src/order/order.routes.ts'

const app = fastify({
    logger: true
})

app.register(orderRoute as any)
app.get('/health', async(_, reply)=>{
    reply.send({
        message:"ok hai"
    })
})



const io = new Server(app.server);

await initRedis();

io.on("connection", (socket) => {
    console.log(socket)

    let driverId: string | null = null;

    socket.on(DRIVER_AVAILABLE, (data) => {

        driverId = data.driverId

        DriverState.markDriverStateAvailable(client, String(driverId))

    });

    socket.on("DRIVER_LOCATION_UPDATE", (locationData) => {

        console.log("Location received:", locationData);

        const { lag, lat, driverId } = locationData;

        LocationService.updateDriverLocation(client, lat, lag, driverId)

    });

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected:", socket.id);
        if (driverId) {
            DriverState.markDriverStateUnavailable(client, String(driverId))
        }
    });
})

await app.listen({
    port: 3001,
    host: "0.0.0.0"
});
