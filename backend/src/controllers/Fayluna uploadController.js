// backend/src/controllers/uploadController.js

const uploadService = require('../services/uploadService');

/**
 * @desc    Handle image upload
 * @route   POST /api/upload
 * @access  Private
 */
const uploadImage = async (req, res, next) => {
  try {
    // Expecting a file under field name "file" from multipart/form-data
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // uploadService.uploadImage should handle storage (e.g., Cloudinary, local disk)
    // and return an object containing at least { url: string, publicId?: string }
    const result = await uploadService.uploadImage(req.file);

    // Respond with the uploaded image URL and any metadata
    res.status(201).json({
      imageUrl: result.url,
      publicId: result.publicId || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImage,
};
