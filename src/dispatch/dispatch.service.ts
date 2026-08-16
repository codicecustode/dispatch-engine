import { createOrderOffer } from "../orderOffer/orderOffer.service.ts";
import { client } from '../redis/redis.config.ts'
import type { Server } from "socket.io";


export const sendOfferTodriver = async (driverId: string, orderId: string, io: Server) => {


    const offer = await createOrderOffer(orderId, driverId);

    const driverSocketId = await client.get(`driver:available:${driverId}`)

    if (!driverSocketId) {
        console.error("driver disconneted")
        return
    }


    io.to(driverSocketId).emit("ORDER_OFFER", {
        offerId: offer.id,
        orderId: offer.orderId,
        expiresAt: offer.expiredAt
    })

    console.log(
        `Offer ${offer.id} sent to ${driverId}`
    );


}