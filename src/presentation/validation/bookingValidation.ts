export function validateBooking(body: any) {
    const { serviceId, date, time } = body;

    if (!serviceId) {
        throw { status: 400, message: "serviceId is required" };
    }

    if (!date) {
        throw { status: 400, message: "date is required" };
    }

    if (!time) {
        throw { status: 400, message: "time is required" };
    }
}
