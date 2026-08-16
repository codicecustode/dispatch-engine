import type { FastifyInstance } from "fastify";
import { createOrder } from "./order.controller.ts";

export const orderRoute = async (app: FastifyInstance) => {

    app.post("/order/create", createOrder);

};