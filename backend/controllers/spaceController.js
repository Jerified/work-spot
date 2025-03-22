import Space from '../models/Space.js';

// @desc    Get all spaces with optional filters
// @route   GET /api/spaces
// @access  Public
export const getSpaces = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, amenities, availability } = req.query;
    let query = {};

    // Apply filters
    if (city) query['address.city'] = city;
    if (availability !== undefined) query.availability = availability === 'true';
    if (minPrice || maxPrice) {
      query.pricePerHour = {};
      if (minPrice) query.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
    }
    if (amenities) {
      query.amenities = { $all: amenities.split(',') };
    }

    const spaces = await Space.find(query).populate('createdBy', 'name email');
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new space
// @route   POST /api/spaces
// @access  Private/Admin
export const createSpace = async (req, res) => {
  try {
    const space = await Space.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update space
// @route   PUT /api/spaces/:id
// @access  Private/Admin
export const updateSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    // Check if user is admin or space creator
    if (req.user.role !== 'admin' && space.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedSpace = await Space.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedSpace);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete space
// @route   DELETE /api/spaces/:id
// @access  Private/Admin
export const deleteSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    // Check if user is admin or space creator
    if (req.user.role !== 'admin' && space.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await space.remove();
    res.json({ message: 'Space removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 