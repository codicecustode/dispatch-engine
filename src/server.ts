import fastify from "fastify";
import { createServer } from "node:http";
import { Server } from "socket.io"
import { client, initRedis } from "./redis/redis.config.ts"
import dotenv from "dotenv"
import { LocationService } from "./location/locationService.ts";
import { DriverState } from "./driver/driverStates.ts";
import { DRIVER_AVAILABLE_EVENT, DRIVER_LOCATION_UPDATE } from "./constants/driver.ts";
dotenv.config();
import { orderRoute } from '../src/order/order.routes.ts'

const app = fastify({
    logger: true
})

app.register(orderRoute as any)
app.get('/health', async (_, reply) => {
    reply.send({
        message: "ok hai"
    })
})



export const io = new Server(app.server);

await initRedis();

io.on("connection", (socket) => {

    let driverId: string | null = null;

    socket.on(DRIVER_AVAILABLE_EVENT, async (data) => {

        driverId = data.driverId

        DriverState.markDriverStateAvailable(client, String(driverId))

        await client.set(`driver:available:${driverId}`,
            socket.id
        )

    });

    socket.on(DRIVER_LOCATION_UPDATE, (locationData) => {

        const { lat, lng, driverId } = locationData ?? {};

        // Ignore malformed updates instead of letting one bad message crash the server
        if (typeof lat !== "number" || typeof lng !== "number" || !driverId) {
            console.warn("Ignoring invalid location update:", locationData);
            return;
        }

        LocationService.updateDriverLocation(client, lat, lng, driverId)

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
