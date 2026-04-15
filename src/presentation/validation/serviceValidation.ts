export function validateService(data: any) {
    const { name, duration, price } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        throw {
            status: 400,
            message: "Service name is required and must be a non-empty string"
        };
    }

    if (duration === undefined || typeof duration !== "number" || duration <= 0) {
        throw {
            status: 400,
            message: "Duration is required and must be a positive number"
        };
    }

    if (price === undefined || typeof price !== "number" || price < 0) {
        throw {
            status: 400,
            message: "Price is required and must be a non-negative number"
        };
    }
}
