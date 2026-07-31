const upload = require('../config/multer');

/**
 * Re-exported, named upload handlers for clarity at the route level.
 */
const uploadSingle = (fieldName) => upload.single(fieldName);
const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);

module.exports = { uploadSingle, uploadMultiple };
