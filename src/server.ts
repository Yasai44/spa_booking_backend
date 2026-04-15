import dotenv from "dotenv";
import express from 'express';
import authRoutes from "./presentation/routes/authRoutes";
import bookingRoutes from "./presentation/routes/bookingRoutes";
import serviceRoutes from "./presentation/routes/serviceRoutes";
import { errorMiddleware } from "./presentation/middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/services", serviceRoutes);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Spa Booking Backend Running');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});