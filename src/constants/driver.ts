// Redis keys
export const DRIVER_AVAILABLE = 'driver:available'
export const DRIVER_BUSY = 'driver:busy'
export const DRIVER_LOCATIONS = 'driver:locations'

// Socket.IO events (must match what the driver app emits)
export const DRIVER_AVAILABLE_EVENT = 'DRIVER_AVAILABLE'
export const DRIVER_LOCATION_UPDATE = 'DRIVER_LOCATION_UPDATE'
