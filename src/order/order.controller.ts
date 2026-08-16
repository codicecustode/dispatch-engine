import type { FastifyReply, FastifyRequest } from "fastify";
import { createOrderService } from "./order.service.ts";

type CreateOrderBody = {
    userId: string;
    pickup: {
        lat: number;
        lng: number;
    };
    dropOff: {
        lat: number;
        lng: number;
    };
};

export const createOrder = async (
    request: FastifyRequest<{
        Body: CreateOrderBody;
    }>,
    reply: FastifyReply
) => {
    const { userId, pickup, dropOff } = request.body;

    const order = await createOrderService(
        userId,
        pickup,
        dropOff
    );

    return reply.code(201).send(order);
};