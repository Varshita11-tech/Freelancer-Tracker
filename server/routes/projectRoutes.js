const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { uploadMultiple } = require('../middleware/uploadMiddleware');
const { createProjectValidator, updateProjectValidator } = require('../validators/projectValidator');

router.use(protect);

router
  .route('/')
  .get(getProjects)
  .post(uploadMultiple('attachments', 5), createProjectValidator, validate, createProject);

router
  .route('/:id')
  .get(getProjectById)
  .put(uploadMultiple('attachments', 5), updateProjectValidator, validate, updateProject)
  .delete(deleteProject);

module.exports = router;
