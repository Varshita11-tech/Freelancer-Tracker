const express = require('express');
const router = express.Router();

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createClientValidator, updateClientValidator } = require('../validators/clientValidator');

router.use(protect);

router.route('/').get(getClients).post(createClientValidator, validate, createClient);

router
  .route('/:id')
  .get(getClientById)
  .put(updateClientValidator, validate, updateClient)
  .delete(deleteClient);

module.exports = router;
