import Booking from '../models/Booking.js';
import Space from '../models/Space.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { spaceId, startTime, endTime, numberOfGuests, specialRequests } = req.body;

    // Check if space exists and is available
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    if (!space.availability) {
      return res.status(400).json({ message: 'Space is not available' });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      space: spaceId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startTime: { $lte: new Date(endTime) },
          endTime: { $gte: new Date(startTime) }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Space is already booked for this time slot' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      space: spaceId,
      startTime,
      endTime,
      numberOfGuests,
      specialRequests
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('space', 'name address pricePerHour')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 