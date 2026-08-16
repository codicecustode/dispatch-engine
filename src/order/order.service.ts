type Location = {
    lat: number;
    lng: number;
};

export const createOrderService = async (
    userId: string,
    pickup: Location,
    dropOff: Location
) => {

    const order = {
        orderId: crypto.randomUUID(),
        userId,
        pickup,
        dropOff,
        status: "CREATED",
        assignedDriverId: null,
    };

    return order;
};