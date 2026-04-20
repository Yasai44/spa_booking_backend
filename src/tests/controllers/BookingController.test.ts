import { BookingController } from "../../presentation/controllers/BookingController";

describe("BookingController", () => {
  let controller: BookingController;
  let mockRepo: any;
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      getByUser: jest.fn(),
      getAll: jest.fn(),
      updateStatus: jest.fn(),
      cancel: jest.fn(),
      existsConflict: jest.fn()
    };

    controller = new BookingController(mockRepo);

    req = { body: {}, params: {} };
    req.user = { id: 1 }; 

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  // ---------------------------------------------------------
  // CREATE BOOKING
  // ---------------------------------------------------------
  it("should create a booking successfully", async () => {
    const booking = {
      id: 1,
      userId: 1,
      serviceId: 2,
      date: "2026-05-01",
      time: "10:00",
      status: "pending",
      createdAt: new Date()
    };

    req.body = {
      serviceId: 2,
      date: "2026-05-01",
      time: "10:00"
    };

    mockRepo.existsConflict.mockResolvedValue(false);
    mockRepo.create.mockResolvedValue(booking);

    await controller.create(req, res, next);

    expect(mockRepo.existsConflict).toHaveBeenCalledWith(2, "2026-05-01", "10:00");
    expect(mockRepo.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: booking
    });
  });

  it("should return 400 if booking conflicts", async () => {
    req.body = {
      serviceId: 2,
      date: "2026-05-01",
      time: "10:00"
    };

    mockRepo.existsConflict.mockResolvedValue(true);

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "This time slot is already booked."
    });
  });

  // ---------------------------------------------------------
  // GET MY BOOKINGS
  // ---------------------------------------------------------
  it("should return bookings for the logged-in user", async () => {
    const bookings = [
      {
        id: 1,
        userId: 1,
        serviceId: 2,
        date: "2026-05-01",
        time: "10:00",
        status: "pending",
        createdAt: new Date(),
        service: {
          id: 2,
          name: "Massage",
          duration: 60,
          price: 100
        }
      }
    ];

    mockRepo.getByUser.mockResolvedValue(bookings);

    await controller.getMine(req, res, next);

    expect(mockRepo.getByUser).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: bookings
    });
  });

  // ---------------------------------------------------------
  // GET ALL BOOKINGS
  // ---------------------------------------------------------
  it("should return all bookings", async () => {
    const bookings = [
      {
        id: 1,
        userId: 1,
        serviceId: 2,
        date: "2026-05-01",
        time: "10:00",
        status: "pending",
        createdAt: new Date(),
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          password: "hashed",
          role: "user"
        },
        service: {
          id: 2,
          name: "Massage",
          duration: 60,
          price: 100
        }
      }
    ];

    mockRepo.getAll.mockResolvedValue(bookings);

    await controller.getAll(req, res, next);

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: bookings
    });
  });

  // ---------------------------------------------------------
  // CANCEL BOOKING
  // ---------------------------------------------------------
  it("should cancel a booking", async () => {
    req.params.id = "1";
    mockRepo.cancel.mockResolvedValue({ count: 1 });

    await controller.cancel(req, res, next);

    expect(mockRepo.cancel).toHaveBeenCalledWith(1, 1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { count: 1 }
    });
  });

  it("should return 404 if cancel fails", async () => {
    req.params.id = "1";
    mockRepo.cancel.mockResolvedValue({ count: 0 });

    await controller.cancel(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Booking not found."
    });
  });

  // ---------------------------------------------------------
  // UPDATE STATUS
  // ---------------------------------------------------------
  it("should update booking status", async () => {
    req.params.id = "1";
    req.body.status = "approved";

    mockRepo.updateStatus.mockResolvedValue({
      id: 1,
      status: "approved"
    });

    await controller.updateStatus(req, res, next);

    expect(mockRepo.updateStatus).toHaveBeenCalledWith(1, "approved");
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 1, status: "approved" }
    });
  });
});
