import type { RedisClientType } from "redis";

export class LocationService {
    private client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    static updateDriverLocation(client: RedisClientType, lat: number, lag: number, driverId: string) {
        client.geoAdd("driver:locations", {
            longitude: lag,
            latitude: lat,
            member: driverId
        });

        console.info(`Driver with ${driverId} location updated`);
    }
}