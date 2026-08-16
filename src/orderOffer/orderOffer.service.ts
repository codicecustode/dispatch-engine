type OrderOfferStatus =
    | "OFFERED"
    | "ACCEPTED"
    | "REJECTED"
    | "EXPIRED";

type OrderOffer = {
    id: string;
    orderId: string;
    driverId: string;
    status: OrderOfferStatus;
    offeredAt: Date;
    expiredAt: Date;
};

const offers = new Map<string, OrderOffer>();

export const createOrderOffer = (
    orderId: string,
    driverId: string
) => {

    const now = new Date();

    const offer: OrderOffer = {
        id: crypto.randomUUID(),
        orderId,
        driverId,
        status: "OFFERED",
        offeredAt: now,
        expiredAt: new Date(
            now.getTime() + 15_000
        )
    };

    offers.set(offer.id, offer);

    return offer;
};