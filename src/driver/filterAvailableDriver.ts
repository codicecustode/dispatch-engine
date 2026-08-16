
import { DriverState } from './driverStates.ts'
import { client } from '../redis/redis.config.ts'
export class FindAvailableDriver {
    static filterAvailableDriver(drivers: {
        member: string;
        distance?: number;
        hash?: number;
        coordinates?: {
            longitude: number;
            latitude: number;
        };
    }[]) {

        return drivers.filter(driver => DriverState.isDriverAvailable(client, driver.member))

    }


    static filterNearestDriver (drivers: {
        member: string;
        distance?: number;
        hash?: number;
        coordinates?: {
            longitude: number;
            latitude: number;
        };
    }[], sortOrder: 'asc' | 'desc' = 'asc'){

         return drivers
        .sort((a, b) => {
            // Fallback to 0 or Infinity if distance is undefined to prevent runtime crashes
            const distA = a.distance ?? Infinity; 
            const distB = b.distance ?? Infinity;

            // Handle sorting direction based on the argument
            return sortOrder === 'asc' 
                ? distA - distB  // Closest first
                : distB - distA; // Furthest first
        });

    }

}