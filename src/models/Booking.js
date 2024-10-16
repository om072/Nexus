import mongoose from "mongoose";
const Schema = mongoose.Schema

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  email: { type: String, required: true },
  sport: { type: Schema.Types.ObjectId, ref: 'Sport' },
  center: { type: String, required: true },
  court: { type: Schema.Types.ObjectId, ref: 'Court'},
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.index({ date: 1, time: 1, sport: 1, center: 1, court: 1 }, { unique: true });

const Booking = mongoose.model('Bookings', bookingSchema);

export default Booking;
